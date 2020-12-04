import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Constants } from '@gintaa/constants';
import { TagsSeo } from '@gintaa/shared/modals';

@Injectable({
  providedIn: 'root'
})
export class TitleTagService { 

  constructor(
      private readonly title: Title,
      private readonly meta: Meta
      ) { }

  public setTitle(title: string): void {
    this.title.setTitle(title);
  }

  // public setSocialMediaTags(url: string, title: string, description: string, imageUrl: string): void {
  //   const tags = [
  //     new MetaTag(this.titleMeta, title, true),
  //     new MetaTag(this.descriptionMeta, description, true),
  //     new MetaTag(this.imageMeta, imageUrl, true),
  //     new MetaTag(this.urlMeta, url, true),
  //     new MetaTag(this.secureImageMeta, imageUrl, true),
  //     new MetaTag(this.twitterTitleMeta, title, false),
  //     new MetaTag(this.twitterImageMeta, imageUrl, false)
  //   ];
  //   this.setTags(tags);
  // }

  // private setTags(tags: MetaTag[]): void {
  //   tags.forEach(siteTag => {
  //   //   const tag = siteTag.isFacebook ?
  //   //   this.meta.getTag(`property=''${siteTag.name}'`) :
  //   //   this.meta.getTag(`name=''${siteTag.name}'`);
  //     if (siteTag.isFacebook) {
  //       this.meta.updateTag({ property: siteTag.name, content: siteTag.value });
  //     } else {
  //       this.meta.updateTag({ name: siteTag.name, content: siteTag.value });
  //     }
  //   });
  // }

  public setSeo(data: TagsSeo) {
    //const tags: { name: string; content: string }[] = [];
    const tags: any[] = [];
    if (data.title) {
      this.title.setTitle(data.title);
      tags.push({ property: Constants.FB_TITLE, content: data.title });
      tags.push({ name: Constants.TWITTER_TITLE, content: data.title });
      // tags.push({ name: Constants.TITLE, content: data.title });
    }
    if (data.description) {
      // tags.push({ name: Constants.DESC, content: data.description });
      tags.push({ property: Constants.FB_DESC, content: data.description });
      tags.push({ name: Constants.TWITTER_DESC, content: data.description });
    }
    if (data.image) {
      tags.push({ property: Constants.FB_IMAGE, content: data.image });
      tags.push({ name: Constants.TWITTER_IMAGE, content: data.image });
      tags.push({ property: Constants.FB_IMAGE_WIDTH, content: Constants.IMAGE_WIDTH });
      tags.push({ property: Constants.FB_IMAGE_HEIGHT, content: Constants.IMAGE_HEIGHT });
    }
    // if (data.url) {
    //   tags.push({ property: 'og:url', content: data.url });
    // }
    const siteName = data.site_name || 'GINTAA';
    tags.push({ property: Constants.FB_SITE_NAME, content: siteName });
    tags.push({ name: Constants.TWITTER_SITE_NAME, content: siteName });
    const type: string = data.type || 'WEBSITE';
    tags.push({ property: Constants.FB_TYPE, content: type });
    console.log('Final Tags:::', tags);
    //this.meta.addTags(tags);
    for (const tag of tags) {
      // this.meta.updateTag(tag);
      this.meta.addTag(tag);
    }
  }

  public removeSeo(): boolean { 
      this.title.setTitle('GINTAA');
      this.meta.removeTag(`name='${Constants.TWITTER_TITLE}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_IMAGE}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_DESC}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_SITE_NAME}'`);
      this.meta.removeTag(`property='${Constants.FB_TITLE}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE}'`);
      this.meta.removeTag(`property='${Constants.FB_DESC}'`);
      this.meta.removeTag(`property='${Constants.FB_SITE_NAME}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE_WIDTH}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE_HEIGHT}'`);
      this.meta.removeTag(`property='${Constants.FB_TYPE}'`);
      return true;
  }
}

