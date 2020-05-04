import cn from 'classnames'
import React, { Component } from 'react'
import s from './styles.scss'
import clearMethod from '../../utils/clearMethod'

class Modal extends Component {
  handleVisibleModal = (evt) => {
    const { handleVisible, current } = this.props
    const {
      dataset: { cancel },
    } = evt.target

    if (cancel) handleVisible(current)
  }

  render() {
    const { active, header, successButton, description, mainHeader, handleSuccess, moreElements } = this.props
    console.log(active)
    return (
      <div className={cn(s.modal, active && s.modal_active)} onClick={this.handleVisibleModal}>
        <div className={s.modal_wrapper} data-cancel>
          <div className={s.modal_content}>
            <div className={s.modal_content_header}>{header}</div>
            {mainHeader && <span className={s.modal_content_main}>{mainHeader}</span>}
            {moreElements && moreElements}
            {description && (
              <p
                className={s.modal_content_description}
                dangerouslySetInnerHTML={{
                  __html: clearMethod(description),
                }}
              />
            )}
            <div className={s.modal_content_buttons}>
              <button className={s.modal_content_cancel} data-cancel>
                Отменить
              </button>
              <button className={s.modal_content_success} onClick={handleSuccess} data-cancel>
                {successButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
