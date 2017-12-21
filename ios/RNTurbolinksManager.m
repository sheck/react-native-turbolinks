#import "RNTurbolinksManager.h"
#import "RNTurbolinks.h"

@import Turbolinks;

@interface RNTurbolinksManager()
@end

@implementation RNTurbolinksManager

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

- (UIView *)view
{
    _session = [[Session alloc] init];
    if(!_turbolinks){
        _turbolinks = [[RNTurbolinks alloc] initWithManager:self bridge:self.bridge];
    }
    return _turbolinks.view;
}

RCT_EXPORT_METHOD(visit:(NSString *)url)
{
    [_turbolinks.navigationBar setTranslucent:YES];
    
    VisitableViewController *visitableViewController = [[VisitableViewController alloc] initWithUrl:[RCTConvert NSURL:url]];
    [_turbolinks pushViewController:visitableViewController animated:YES];
    [_session visit:visitableViewController];
    
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    [rootViewController presentViewController:_turbolinks animated:NO completion:nil];
}

@end
