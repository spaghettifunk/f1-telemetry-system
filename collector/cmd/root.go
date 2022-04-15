package cmd

import (
	"fmt"
	"os"
	"os/signal"

	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/logger"
	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/telemetry"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	debugFlag = "debug"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "collector",
	Short: "Collects UDP packets from the game",
	Long: `The application is able to listen for UDP packets
	coming from F1 2021 game on any platform. The packets collected are
	then redirected to the database of choice (default: Clickhouse)`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		isDebug, _ := cmd.Flags().GetBool(debugFlag)
		tl, err := logger.New(isDebug)
		if err != nil {
			fmt.Println(err.Error())
			os.Exit(1)
		}

		client, err := telemetry.New("0.0.0.0", 20777, telemetry.WithKafka("localhost:9092"), tl)
		if err != nil {
			tl.WriteError(err.Error())
			os.Exit(1)
		}

		tl.WriteInfo(fmt.Sprintf("Initiating collection of packets on %s:%d", "0.0.0.0", 20777))

		// wait exit signal
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt)
		go func() {
			<-c
			tl.WriteInfo("Shutting down collector...")
			os.Exit(0)
		}()

		client.Collect()
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	f := rootCmd.Flags()

	f.Bool(debugFlag, false, "Enable DEBUG mode to visualize the messages incoming from the Telemetry system")

	viper.BindPFlags(f)
}
