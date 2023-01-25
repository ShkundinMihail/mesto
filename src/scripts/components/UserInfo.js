export default class UserInfo {
    constructor({ name, work }) {
        this._name = document.querySelector(name);
        this._work = document.querySelector(work);
    }

    getUserInfo() {
        const authorInfo = {
            name: this._name.textContent,
            work: this._work.textContent,
        }
        return authorInfo;
    }

    setUserInfo({ nameAuthor, workAuthor }) {
        this._name.textContent = nameAuthor;
        this._work.textContent = workAuthor;
    }
}