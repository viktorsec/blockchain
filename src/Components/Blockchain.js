import React, {Component} from 'react'

class Blockchain extends Component {

  constructor(props) {
    super(props)
    const address = "1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj"
    this.state = {
      address: address,
    }
    this.getAddressBalance = this.getAddressBalance.bind(this)
    this.getUSDRate = this.getUSDRate.bind(this)
  }

  componentDidMount() {
    const {address} = this.state
    this.getAddressBalance(address)
      .then(res => this.setState({balance: res}))
    this.getUSDRate()
      .then(res => this.setState({usdRate: res}))
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
      .catch((e) => console.log('API error', e))
  }

  getUSDRate() {
    const hub = 'https://private-anon-0bf4dd50e5-blockchaininfo.apiary-mock.com/q/'
    const query = `${hub}24hrprice`

    return fetch(query)
      .then((res) => res.json())
      .catch((e) => console.log('API error', e))
  }

  render() {
    const {address, balance, usdRate} = this.state
    const balanceUSD = balance * usdRate
    return (
      <div>
        <p>Current balance for {address}: {balance}</p>
        <p>That is about ${balanceUSD}.</p>
      </div>
    )
  }

}

export default Blockchain
