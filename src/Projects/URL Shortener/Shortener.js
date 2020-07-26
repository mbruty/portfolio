import React, {
    Component
} from 'react'

export default class Shortener extends Component {
    constructor() {
        super();
        this.state = {
            urlEmpty: false,
            slugEmpty: false,
            data: {
                url: "",
                slug: ""
            }
        }
        this.urlChanged = this.urlChanged.bind(this);
        this.slugChanged = this.slugChanged.bind(this);
        this.submit = this.submit.bind(this);
    }

    urlChanged(evt) {
        this.setState({
            data: {
                url: evt.target.value,
                state: this.state.data.state,
            },
            urlEmpty: evt.target.value === ""
        });
    }

    slugChanged(evt) {
        this.setState({
            data: {
                url: this.state.data.url,
                slug: evt.target.value
            },
            slugEmpty: evt.target.value === ""
        });
        let lbl = document.getElementById('txtLbl');
        lbl.innerText = `New link: ${window.location.href}` + evt.target.value;
        lbl.classList.remove('err');
        lbl.classList.remove('success');
    }
    async submit() {
        let data = this.state.data;
        this.setState({
            urlEmpty: data.url === ""
        });
        this.setState({
            slugEmpty: data.slug === ""
        });
        if (data.url !== "" && data.slug !== "") {
            await fetch(`${window.location.href}api`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    data
                }),
            }).then((res) => {
                if (res.ok) {
                    let lbl = document.getElementById('txtLbl');
                    lbl.innerText = `Created! ${window.location.href}` + this.state.data.slug;
                    lbl.classList.remove('err');
                    lbl.classList.add('success');
                } else if (res.status === 400) {
                    res.json().then(errMsg => {
                        console.log(errMsg.message);
                        let lbl = document.getElementById('txtLbl');
                        lbl.classList.remove('success');
                        lbl.classList.add('err');
                        lbl.innerText = errMsg.message;
                    });
                }
            }).catch(res => {
                console.log(res);
            })
        }
    }

    render() {
        return (
        <div class="center">
            <div class="lbl" id="txtLbl">New link: {window.location.href}</div>
            <div class="url-box">
                <input placeholder={ this.state.urlEmpty ? "Enter a URL (Cannot be empty!)" : "Enter a URL"} className={ this.state.urlEmpty ? "err-input" : ""}
                 onChange={this.urlChanged} id="urlInput"/><br/>
            </div>
            <div class="url-box">
                <input placeholder={ this.state.urlEmpty ? "Enter URL Slug (Cannot be empty!)" : "Enter URL Slug"} className={ this.state.slugEmpty ? "bottom err-input" : "bottom"} id="slug" onChange={this.slugChanged}/><br/>
            </div>
            <button class="submit-btn" onClick={this.submit}>Submit<i class="fa fa-angle-right arrow"></i></button>
        </div>
        )
    }
}
