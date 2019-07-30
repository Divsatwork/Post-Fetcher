class post {
    constructor(data) {
        this.upvotes = 0;
        this.text = data['text'];
        this.creationTime = data['creationTime'];
    }
}

module.exports = post;