import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'f1-telemetry-system',
    brokers: ['kafka:9092'],
})

async function consumeSession(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'session_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'session' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('session', message.value);
        },
    });
}

async function consumeParticipants(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'participants_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'participants' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('participants', message.value);
        },
    });
}

async function consumeWeather(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'weather_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'weather' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('weather', message.value);
        },
    });
}

async function consumeFastestLap(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'fastest_lap_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'fastest_lap' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('fastest_lap', message.value);
        },
    });
}

async function consumeRetirement(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'retirement_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'retirement' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('retirement', message.value);
        },
    });
}

async function consumeTeammatePit(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'teammate_pit_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'teammate_pit' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('teammate_pit', message.value);
        },
    });
}

async function consumeRaceWinner(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'race_winner_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'race_winner' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('race_winner', message.value);
        },
    });
}

async function consumePenalty(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'penalty_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'penalty' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('penalty', message.value);
        },
    });
}

async function consumeSpeedTrap(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'speed_trap_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'speed_trap' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('speed_trap', message.value);
        },
    });
}

async function consumeStopGoServed(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'stop_go_served_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'stop_go_served' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('stop_go_served', message.value);
        },
    });
}

async function consumeDriveThroughServed(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'drive_through_served_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'drive_through_served' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('drive_through_served', message.value);
        },
    });
}

async function consumeCarTelemetry(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'car_telemetry_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'car_telemetry' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('car_telemetry', message.value);
        },
    });
}

async function consumeLap(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'lap_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'lap' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('lap', message.value);
        },
    });
}

async function consumeCarStatus(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'car_status_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'car_status' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('car_status', message.value);
        },
    });
}

async function consumeMotionData(socket: any) {
    const consumer = kafkaClient.consumer({ groupId: 'motion_data_group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'motion_data' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            socket.emit('motion_data', message.value);
        },
    });
}

export {
    consumeSession,
    consumeParticipants,
    consumeWeather,
    consumeFastestLap,
    consumeTeammatePit,
    consumeRaceWinner,
    consumePenalty,
    consumeSpeedTrap,
    consumeStopGoServed,
    consumeDriveThroughServed,
    consumeRetirement,
    consumeCarTelemetry,
    consumeLap,
    consumeCarStatus,
    consumeMotionData
};