import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { numAllHits } from './database/helper';

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

    async hitDB(source) {
        const numHits = await numAllHits();
        const url = "https://memehits-18c19.firebaseio.com/" + numHits.toString() + ".json";
        const UUID = this.props.memeId;
        let d = new Date();
        let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const data = {
            "meme_id": UUID, "source": source, "timestamp": today
        };
        await axios.put(url, data);
        this.closeModal();
    };

    render() {
        return (
            <div className="btn-group">
                <input type="button" value="Have you seen this meme before?" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <h1 className="popup_title">What is the source of your meme?</h1>
                    <div className="modal-table">
                        <div className="modal-table-cell">
                            <img alt="reddit" src="https://www.redditstatic.com/new-icon.png" className="popup_image"></img>
                            <button onClick={() => this.hitDB("reddit")} className="popup_content">Reddit</button>
                        </div>
                        <div className="modal-table-cell">
                            <img alt="facebook" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png" className="popup_image"></img>
                            <button onClick={() => this.hitDB("FB")} className="popup_content">Facebook</button>
                        </div>
                        <div className="modal-table-cell">
                            <img alt="instagram" src="https://instagram-brand.com/wp-content/themes/ig-branding/assets/images/ig-logo-email.png" className="popup_image"></img>
                            <button onClick={() => this.hitDB("instagram")} className="popup_content">Instagram</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default PopUp;