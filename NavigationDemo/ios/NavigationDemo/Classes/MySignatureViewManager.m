//
//  MySignatureViewManager.m
//  WealthMobile
//
//  Created by 耐克了解了 on 6/11/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MySignatureViewManager.h"
#import <React/RCTBridge.h>


@implementation MySignatureViewManager

RCT_EXPORT_MODULE(RCTSignatureView)

RCT_EXPORT_METHOD(saveSignatureImage
{
  CGFloat scale = [UIScreen mainScreen].scale;
  // 开启位图上下文
  UIGraphicsBeginImageContextWithOptions(self.signatureView.bounds.size, NO, scale);
  
  // 获取位图上下文
  CGContextRef ctx = UIGraphicsGetCurrentContext();
  
  // 把控件的图层渲染到上下文
  [self.signatureView.layer renderInContext:ctx];
  
  // 获取图片
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  NSData *data = UIImageJPEGRepresentation(image, 1.0f);
  
  NSString *encodedImageStr = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  
  NSLog(@"encodedImageStr==%@",encodedImageStr);

  
  // 关闭上下文
  UIGraphicsEndImageContext();
})

- (UIView *)view
{
  MySignatureView *signatureView = [[MySignatureView alloc] initWithFrame:CGRectMake(100, 100, 100, 100)];
  self.signatureView = signatureView;
  return signatureView;
}

@end
