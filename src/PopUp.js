import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section>
                <h1></h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="popup_title">What is the source of your meme?</h1>
                        <div>
                            <img src="https://www.redditstatic.com/new-icon.png" className="popup_image"></img>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()} className="popup_content">Reddit</a>
                        </div>
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png" className="popup_image"></img>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()} className="popup_content">Facebook</a>
                        </div>
                        <div>
                            <img src="https://instagram-brand.com/wp-content/themes/ig-branding/assets/images/ig-logo-email.png" className="popup_image"></img>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()} className="popup_content">Instagram</a>
                        </div>
                    </div>
                </Modal>
            </section>
        );
    }



}

export default PopUp;