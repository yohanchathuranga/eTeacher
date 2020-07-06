export interface Forum {
    _id: string;
    title: string;
    body: string;
    image:string;
    type: string;
    timestamps: Date;
    views: number;
    owner: string;
    timeAgo:string;
    replies:number;
    votes:number;
  }