package producers

// PacketLog defines the generic payload to transmit to the producer
type PacketLog struct {
	// Name can be either a table or a topic
	Name string
	// Message is the byte representation of the JSON UDP Packet
	Message []byte
}

// ProducerLog is the interface for the different type of producer system
type ProducerLog interface {
	Write(PacketLog) error
}
