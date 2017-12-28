#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RNTurbolinksManager, RCTViewManager)
RCT_EXTERN_METHOD(reloadVisitable)
RCT_EXTERN_METHOD(reloadSession)
RCT_EXTERN_METHOD(visit:(NSDictionary *))
RCT_EXTERN_METHOD(replace:(NSDictionary *))
RCT_EXPORT_VIEW_PROPERTY(userAgent, NSString)
RCT_EXPORT_VIEW_PROPERTY(onMessage, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVisit, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
@end
