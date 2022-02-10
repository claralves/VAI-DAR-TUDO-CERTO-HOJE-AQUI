class Controller {
    newTweetId: number = 0;
    users: Map<string, User>;
    tweets: Map<number, Tweet>;

    constructor() {
        this.users = new Map<string, User>();
        this.tweets = new Map<number, Tweet>();
    }

    public addUser(username: string): boolean {
        //pra q serve essa exclamação?
        if(!this.users.has(username)) {
            let novoUsuario = new User(username);
            this.users.set(username, novoUsuario);
            return true;
        } else {
            console.log("fail: usuario ja existente");
            return false;
        }
    }

    public getUser(username: string) {
        if(this.users.has(username)) {
            let user = this.users.get(username);
            return user;
        } else {
            console.log("fail: usuario inexistente");
        }
    }

    public createTweet(sender: string, msg: string) {
        //let tuite = new Tweet
    }

    public sendTweet(username: string, msg: string) {
        if(this.users.has(username)) {
            let twitador =this.getUser(username);
            let tuitada = this.createTweet(username, msg);
            twitador!.sendTweet(tuitada);
        }
    }

    public sendRt(username: string, idTw: number, msg: string) {
        
    }

    public rmUser(username: string) {

    }
}

class User {
    private username: string;
    //oq seria esse inbox?
    private inbox: Inbox;
    private followers: Map<string, User>;
    private following: Map<string, User>;

    constructor(username: string) {
        this.username = username;
        this.followers = new Map<string, User>();
        this.following = new Map<string, User>();
        this.inbox = new Inbox();
    }

    public getUsername(): string {
        return this.username;
    }

    public getFollowers(): Array<string> {
        //chave primária
       return [...this.followers.keys()];
    }

    public getFollowing(): Array<string> {
        return [...this.following.keys()];
    }

    public getInbox(): Inbox {

    }

    public sendTweet(tw: Tweet) {

    }

    public unfollow(other: string) {

    }

    public like(idTw: number) {
        let liked = this.inbox.getMyTweets(idTw);
        liked!.addLike(this.getUsername());
    }

    public unfollowAll() {

    }

    public rejectAll() {

    }
}

class Tweet {
    private id: number;
    private username: string;
    private msg: string;
    private likes: Array<String>;
    private rt: Array<Tweet>;
    private deleted: boolean = false;

    constructor(id: number, username: string, msg: string) {
        this.id = id;
        this.username = username;
        this.msg = msg;
        //vetor
        this.likes = [];
        //oq seria retwittar mds
        this.rt = [];
        this.deleted;
    }

    public getId(): number {
        return this.id;
    }

    //public getSender(): string {

    //}

    public getUsername(): string {
        return this.username;
    }

    public getMsg(): string {
        return this.msg;
    }

    public addLike(nick: string) {
        this.likes.push(nick);
    }

    public getLikes(): Array<String> {
        return this.likes;
    }

    public setRt(tw: Tweet) {
        this.rt.push(tw);
    }


}

class Inbox {
    private timeline: new Map<number, Tweet>();
    private myTweets: new Map<number, Tweet>();

    constructor() {
        this.timeline = new Map< number, Tweet>();
        this.myTweets = new Map<number, Tweet>();
    }

    public storeInTimeline(tweet: Tweet) {

    }

    public Timeline(): List<Tweet> {

    }

    public getTweet(twId: number): Tweet|undefined {
        if(this.timeline.has(twId)) {
            let retornaTw = this.timeline.length(twId);
            return retornaTw;
        }
    }

    public rmMsgsFrom(username: string) {

    }

    public storeInMyTweets(tweet: Tweet) {

    }

    public getMyTweets(tweet: Tweet) {
        this.myTweets.set(tweet.getId(), tweet);
    }
}