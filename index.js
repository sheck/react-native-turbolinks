import { NativeEventEmitter, NativeModules, processColor, Platform } from 'react-native'

const RNTurbolinksManager = NativeModules.RNTurbolinksManager || NativeModules.RNTurbolinksModule
const RNTurbolinksManagerEmitter = new NativeEventEmitter(RNTurbolinksManager)

const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource')

class Turbolinks {

  static Constants = {
    ErrorCode: RNTurbolinksManager.ErrorCode,
    Action: RNTurbolinksManager.Action
  }

  static startSingleScreenApp(route, options = {}) {
    this._processRoute(route)
    this._processAppOptions(options)
    RNTurbolinksManager.startSingleScreenApp(route, options)
  }

  static reloadVisitable() {
    RNTurbolinksManager.reloadVisitable()
  }

  static reloadSession() {
    RNTurbolinksManager.reloadSession()
  }

  static dismiss(animated = true) {
    RNTurbolinksManager.dismiss(animated)
  }

  static popToRoot(animated = true) {
    RNTurbolinksManager.popToRoot(animated)
  }

  static back(animated = true) {
    RNTurbolinksManager.back(animated)
  }

  static visit(route) {
    this._processRoute(route)
    RNTurbolinksManager.visit(route)
  }

  static replaceWith(route) {
    this._processRoute(route)
    RNTurbolinksManager.replaceWith(route)
  }

  static renderTitle(title, subtitle = null) {
    RNTurbolinksManager.renderTitle(title, subtitle)
  }

  static renderActions(actions) {
    RNTurbolinksManager.renderActions(actions)
  }

  static injectJavaScript(script) {
    return RNTurbolinksManager.injectJavaScript(script)
  }

  static addEventListener(eventName, callback) {
    RNTurbolinksManagerEmitter.addListener(eventName, callback)
  }

  static removeEventListener(eventName, callback) {
    RNTurbolinksManagerEmitter.removeListener(eventName, callback)
  }

  static _processAppOptions(options) {
    if (options.navBarStyle) {
      options.navBarStyle = {
        ...options.navBarStyle,
        barTintColor: processColor(options.navBarStyle.barTintColor),
        tintColor: processColor(options.navBarStyle.tintColor),
        titleTextColor: processColor(options.navBarStyle.titleTextColor),
        subtitleTextColor: processColor(options.navBarStyle.subtitleTextColor)
      }
      if (options.navBarStyle.menuIcon) {
        options.navBarStyle.menuIcon = resolveAssetSource(options.navBarStyle.menuIcon)
      }
    }
  }

  static _processRoute(route) {
    if (route.titleImage) { route.titleImage = resolveAssetSource(route.titleImage) }
    if (route.leftButtonIcon) { route.leftButtonIcon = resolveAssetSource(route.leftButtonIcon) }
    if (route.rightButtonIcon) { route.rightButtonIcon = resolveAssetSource(route.rightButtonIcon) }
    if (route.navIcon) { route.navIcon = resolveAssetSource(route.navIcon) }
    if (route.actions) { route.actions = this._processActions(route.actions) }
  }

  static _processActions(actions) {
    return actions.map((action) => {
      if (action.icon) { action.icon = resolveAssetSource(action.icon) }
      return action
    })
  }

}

module.exports = Turbolinks;
