package cmd

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/spaghettifunk/f1-telemetry-system/collector/pkg/telemetry"
	"github.com/spf13/cobra"
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
		client, err := telemetry.New("0.0.0.0", 20777, telemetry.WithKafka("localhost:9092"))
		if err != nil {
			fmt.Println(err.Error())
			os.Exit(1)
		}

		log.Printf("Initiating collection of packets on %s:%d", "0.0.0.0", 20777)

		// wait exit signal
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt)
		go func() {
			<-c
			log.Println("Shutting down collector...")
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
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.collector.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
