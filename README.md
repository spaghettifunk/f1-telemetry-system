# f1-telemetry-system

App for visualising F1 2021 telemetries

## Dependencies

Have `Go` installed.

Install `docker` and make sure `docker-compose` works as expected. I currently use 4 CPUs and 4GB of RAM to run the whole system.

I haven't automated the creation of the tables in Clickhouse yet, hence you need upload them manually. Without installing many small
components, I suggest to use [DBeaver](https://dbeaver.io/) to run queries into Clickhouse.


# How to start

`docker-compose up -d` and wait for a couple of minutes that Kafka, Zookeeper and all the other systems are up and running. 
Open your browser and go to `http://localhost:8080` and you should see Kowl appearing. If you check the project, a folder called `data/clickhouse` should have been creted. If not, please create one. This folder won't be pushed to Git.

Open DBeaver (or whatever tool you chose) and run all the queries in the file `/configs/clickhouse/tables.sql`. Once you have done that, Clickhouse is ready to listen to Kafka on specific topics (check the SQL file for more info). Don't worry if data is not yet in kafka or the topics are not created yet. Clickhouse consumers are pretty smart.

You can now go to the `collector` folder and run `go run main.go`. A message like the one below should appear.

```
2022/03/29 14:09:02 Initiating collection of packets on 0.0.0.0:20777
2022/03/29 14:09:02 Collecting events...
```

Now, you should get the IP of your local machine in the local-network. In general it starts with `192.168.x.x`. Keep that IP address in mind since you'll need to put in the Telemetry settings on F1 2021. 
Open F1 2021 and go to the Settings. Open the Telemtry settings and insert the IP address you saved before and use `20777` as port. **IMPORTANT:** your console needs to be in the same network as your laptop otherwise the discovery doesn't work.

Once all the steps above are done, every time you press on a button you should see a JSON message appear on the console. Once you start a session, data will begin flooding towards your console. If everything went well, you should be able to query Clickhouse with `SELECT * FROM car_telemetry` or other tables and get some rows in it.