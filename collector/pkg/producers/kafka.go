package producers

import (
	"strings"

	"github.com/Shopify/sarama"
)

// Client is the object for sending the logs to Kafa
type Kafka struct {
	Producer sarama.SyncProducer
}

// SASLMechanism functional option for the kafka configuration
// Values accepted: "OAUTHBEARER", "PLAIN", "SCRAM-SHA-256", "SCRAM-SHA-512", "GSSAPI"
func SASLMechanism(m string) func(*sarama.Config) {
	return func(cfg *sarama.Config) {
		cfg.Net.SASL.Enable = true
		cfg.Net.SASL.Mechanism = sarama.SASLMechanism(m)
	}
}

// Credentials functional option for the kafka configuration
// For functional options see:
// https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis
func Credentials(username, password string) func(*sarama.Config) {
	return func(cfg *sarama.Config) {
		cfg.Net.SASL.User = username
		cfg.Net.SASL.Password = password
	}
}

// New create a new object for interacting with Kafka
func NewKafka(brokers string, options ...func(*sarama.Config)) (Kafka, error) {
	bs := strings.Split(brokers, ",")

	cfg := sarama.NewConfig()
	cfg.Producer.Return.Errors = true
	cfg.Producer.Return.Successes = true

	for _, opt := range options {
		opt(cfg)
	}

	producer, err := sarama.NewSyncProducer(bs, cfg)
	if err != nil {
		return Kafka{}, err
	}
	return Kafka{
		Producer: producer,
	}, nil
}

func (k Kafka) Write(pl PacketLog) error {
	// send to kafka topic
	if _, _, err := k.Producer.SendMessage(&sarama.ProducerMessage{
		Topic: pl.Name,
		Value: sarama.StringEncoder(pl.Message),
	}); err != nil {
		return err
	}
	return nil
}

// Close closes the producer object
func (k Kafka) Close() error {
	return k.Producer.Close()
}
