import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import style from './card.module.scss';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: [],
      isFetching: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cash: data,
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isFetching: false }));
  }

  render() {
    const { cash, isFetching, error } = this.state;

    const view = cash.map(function (current) {
      return (
        <Card
          className={style.card}
          key={(current.sale, current.buy, current.base_ccy, current.ccy)}>
          <h1>{current.ccy}</h1>
          <p>
            <strong> Продажа :</strong> {current.sale}
          </p>
          <p>
            <strong> Покупка:</strong> {current.buy}
          </p>

          {/* <p> {current.base_ccy}</p> */}
        </Card>
      );
    });

    if (isFetching) return <LinearProgress className={style.load} />;
    if (error)
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to get data — <strong>Звоните фиксикам!</strong>
        </Alert>
      );

    return (
      <div className={style.container}>
        <h1 className={style.exchange}>Курс валют</h1>

        {view}
      </div>
    );
  }
}
export default Cards;
