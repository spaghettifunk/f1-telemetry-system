package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type TelemetryLogger struct {
	logger *zap.Logger
}

func New(debug bool) (*TelemetryLogger, error) {
	config := zap.NewProductionConfig()
	config.Encoding = "console"
	config.EncoderConfig.EncodeTime = zapcore.TimeEncoderOfLayout("2006-01-02 15:04:05")
	config.EncoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	config.EncoderConfig.CallerKey = ""

	if debug {
		config.Level = zap.NewAtomicLevelAt(zap.DebugLevel)
	}

	logger, err := config.Build()
	if err != nil {
		return nil, err
	}

	t := &TelemetryLogger{
		logger: logger,
	}

	return t, nil
}

func (t *TelemetryLogger) WriteDebug(msg string) {
	if t.logger.Core().Enabled(zap.DebugLevel) {
		t.logger.Debug(msg)
	}
}

func (t *TelemetryLogger) WriteInfo(msg string) {
	t.logger.Info(msg)
}

func (t *TelemetryLogger) WriteWarn(msg string) {
	t.logger.Warn(msg)
}

func (t *TelemetryLogger) WriteError(msg string) {
	t.logger.Error(msg)
}

func (t *TelemetryLogger) Quit() {
	t.logger.Sync()
}
