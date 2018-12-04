//
//  MySignatureView.h
//  WealthMobile
//
//  Created by 耐克了解了 on 6/11/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface MySignatureView : UIView


-(void)addPA:(CGPoint)nPoint;

-(void)addLA;

-(void)revocation;

-(void)refrom;

-(void)clear;

-(void)setLineColor:(NSInteger)color;

-(void)setlineWidth:(NSInteger)width;

@end

NS_ASSUME_NONNULL_END
