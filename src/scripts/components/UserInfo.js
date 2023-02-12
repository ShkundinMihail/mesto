export default class UserInfo {
    constructor({ name, work, avatar }) {
        this._name = document.querySelector(name);
        this._work = document.querySelector(work);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        const authorInfo = {
            name: this._name.textContent,
            work: this._work.textContent,
            avatar: this._avatar.src,
        }
        return authorInfo;
    }

    setUserInfo({ nameAuthor, workAuthor }) {
        this._name.textContent = nameAuthor;
        this._work.textContent = workAuthor;

    }
    setUserAvatar({ avatarAuthor }) {
        this._avatar.src = avatarAuthor;
    }
}