export interface Forum {
    id: string;
    title: string;
    body: string;
    timestamps: Date;
    views: number;
    owner: string;
    timeAgo:string;
    replies:number;
    votes:number;
  }