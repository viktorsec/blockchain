import React, {Component} from 'react'

class Blockchain extends Component {

  constructor(props) {
    super(props)
    const address = "1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj"
    this.state = {
      address: address,
      balance: 0,
    }
    this.getAddressBalance = this.getAddressBalance.bind(this)
  }

  componentDidMount() {
    const {address} = this.state
    this.getAddressBalance(address)
      .then(res => this.setState({balance: res}))
  }

  getAddressBalance(address) {
    const hub = 'https://blockchain.info/q/'
    const confirmations = 6
    const query = `${hub}addressbalance/${address}?confirmations=${confirmations}`

    return fetch(query)
      .then((res) => res.json())
      .then((res) => {
        const bitcoinBalance = res / 1000
        return bitcoinBalance
      })
      .catch((e) => console.log(e))
  }

  render() {
    const {address, balance} = this.state
    return (
      <div>Current balance for {address}: {balance}</div>
    )
  }

}

export default Blockchain
