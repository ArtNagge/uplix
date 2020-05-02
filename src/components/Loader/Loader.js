import cn from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import s from './styles.scss'

class Loader extends React.Component {
  render() {
    const { load, children } = this.props

    return (
      <>
        <div className={cn(s.loader, !load && s.disable)}>
          <div id={s.loader} />
        </div>
        {children}
      </>
    )
  }
}

const mapStateToProps = ({ app: { load } }) => ({ load })

export default connect(mapStateToProps, {})(Loader)
