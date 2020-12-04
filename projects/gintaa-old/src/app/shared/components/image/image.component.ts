import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';

// https://stackblitz.com/edit/image-cropper?file=app%2Fapp.component.html

@Component({
  selector: 'app-image-modal',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  // Pagination
  totalImageCount = 0;
  activeImageIndex = 0;

  // Image Cropper Variables
  imageChangedEvent: any = '';
  imageFile: any;

  // Output
  images: any = [];

  constructor(
    public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.activeImageIndex = 0;
    this.totalImageCount = 0;

    const files: any = this.data.files;
    this.totalImageCount = files.length;
    this.preparePreview(files);
  }

  preparePreview(files) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.type.split('.').pop().toLowerCase();
        const fileName = file.name;
        console.log(`File ::: name: ${fileName}, type: ${fileType}`);

        let active = false;
        if (i === 0) {
          active = true;
        }
        const transform: ImageTransform = {};
        const obj = {
          file,
          name: fileName,
          type: fileType,
          croppedBase64: '',
          active,
          transform,
          rotation: 0
        };
        this.images.push(obj);
      }
    }
  }

  next() {
    let activeCount = 0;
    for (let i = 0; i < this.images.length; i++) {
      const img = this.images[i];
      if (img.active) {
        activeCount = i;
      }
    }

    this.images.forEach(
      (img: any) => img.active = false
    );

    this.activeImageIndex = activeCount + 1;
    const image = this.images[this.activeImageIndex];
    image.active = true;
  }

  private findActiveImage() {
    const filteredImages = this.images.filter((image) => {
      return image.active;
    });
    const activeImage = filteredImages[0];
    return activeImage;
  }

  flipHorizontal() {
    const activeImage = this.findActiveImage();
    activeImage.transform = {
      ...activeImage.transform,
      flipH: !activeImage.transform.flipH
    };
  }

  flipVertical() {
    const activeImage = this.findActiveImage();
    activeImage.transform = {
      ...activeImage.transform,
      flipV: !activeImage.transform.flipV
    };
  }

  rotateLeft() {
    const activeImage = this.findActiveImage();
    activeImage.rotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    const activeImage = this.findActiveImage();
    activeImage.rotation++;
    this.flipAfterRotate();
  }
  private flipAfterRotate() {
    const activeImage = this.findActiveImage();
    const flippedH = activeImage.transform.flipH;
    const flippedV = activeImage.transform.flipV;
    activeImage.transform = {
      ...activeImage.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  upload() {
    const files = [];
    this.images.forEach(
      (elem) => {
        const bolb = base64ToFile(elem.croppedBase64);
        const file = new File([bolb], elem.name, { type: elem.type });
        files.push(file);
      }
    );
    const res = { status: 3, files };
    // console.log(`Result :::: ${JSON.stringify(res)}`);
    this.dialogRef.close(res);
  }

  imageCropped(event: ImageCroppedEvent) {
    const filteredImages = this.images.filter(
      (image) => {
        return image.active;
      }
    );
    const activeImage = filteredImages[0];
    activeImage.croppedBase64 = event.base64;
  }

  imageLoaded() { }
  cropperReady() { }
  loadImageFailed() { }

  cancel() {
    this.data.files = [];
    this.dialogRef.close({});
  }

}
