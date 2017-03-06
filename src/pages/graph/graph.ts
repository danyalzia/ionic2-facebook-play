import { Component } from '@angular/core';  
import { NavController } from 'ionic-angular';  
import { GraphService } from '../../providers/graph';

import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
  providers: [GraphService]
})
export class GraphPage {

  pagelink: string;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphPage');
  }

  public data: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public graphService: GraphService) {                  
	this.pagelink = "michaelhyatt";
	this.saveLink();
  }
  
  saveLink() {
	
	var fields = "posts{from,created_time,message,attachments,comments.order(chronological)}";
	
	var page;
	
	if (this.pagelink.includes("https://www.facebook.com/")) {
		page = this.pagelink.replace("https://www.facebook.com/", '');
	}
	
	else if (this.pagelink.includes("https://facebook.com/")) {
		page = this.pagelink.replace("https://facebook.com/", '');
	}
	
	else if (this.pagelink.includes("www.facebook.com/")) {
		page = this.pagelink.replace("www.facebook.com/", '');
	}
	
	else if (this.pagelink.includes("facebook.com/")) {
		page = this.pagelink.replace("facebook.com/", '');
	}

	else {
		page = this.pagelink;
	}
	
	// Get the data
    this.data = this.graphService
      .getPosts(page, fields)
      .map(data => data.map((post) => {
		  return {
			  from: post.from,
			  id: post.id,
			  time: post.created_time * 1000,
			  message: post.message,
			  photos: this.getPhotos(post)
		  };
	  }));
  }
  
  getPhotos = (post) => {
    if (!post.attachments)
      return [];

    let attachments = post.attachments.data[0].subattachments ||
                      post.attachments;

    return attachments.data
      .filter(x => x.type == "photo")
      .map(x => x.media.image);
  }
}
