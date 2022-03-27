package producers

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/ClickHouse/clickhouse-go/v2"
)

type ClickHouse struct {
	*sql.DB
	context.Context
}

func NewClickHouse(addr string, port string) (ClickHouse, error) {
	conn, err := sql.Open("clickhouse", fmt.Sprintf("clickhouse://%s:%s", addr, port))
	if err != nil {
		log.Fatal(err)
		return ClickHouse{}, err
	}

	ctx := clickhouse.Context(context.Background(), clickhouse.WithStdAsync(false))
	return ClickHouse{
		conn,
		ctx,
	}, nil
}

func (c ClickHouse) Write(pl PacketLog) error {
	res, err := c.ExecContext(c.Context, fmt.Sprintf(
		`INSERT INTO %s 
		VALUES (%d, '%s', [1, 2, 3, 4, 5, 6, 7, 8, 9], now())`,
		pl.Name, 1, pl.Message))
	if err != nil {
		log.Fatal(err)
		return err
	}
	r, err := res.RowsAffected()
	if err != nil {
		log.Fatal(err)
		return err
	}
	log.Println(r)
	return nil
}
