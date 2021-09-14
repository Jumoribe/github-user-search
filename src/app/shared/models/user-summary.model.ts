export class UserSummary{
  login: string;
  id: number;
  avatar_url: string;
  starred_url: string;
  repos_url: string;
  name: string;
  location: string;
  email: string;
  bio: string;
  followers: number;
  following: number;

  constructor(
    login:string,
    id: number,
    avatar_url: string,
    starred_url: string,
    repos_url: string,
    name: string,
    location: string,
    email: string,
    bio: string,
    followers: number,
    following: number,
    ){
    this.login = login
    this.id = id,
    this.avatar_url = avatar_url,
    this.starred_url = starred_url,
    this.repos_url = repos_url,
    this.name = name,
    this.location = location,
    this.email = email,
    this.bio = bio,
    this.followers = followers,
    this.following = following
  }

}
