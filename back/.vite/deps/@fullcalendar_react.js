import "./chunk-ULJGACYD.js";
import {
  require_react_dom
} from "./chunk-4ASWBRZ3.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  Calendar,
  CustomRenderingStore
} from "./chunk-3GRI3ZX6.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/@fullcalendar/react/dist/index.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var reactMajorVersion = parseInt(String(import_react.default.version).split(".")[0]);
var syncRenderingByDefault = reactMajorVersion < 18;
var FullCalendar = class extends import_react.Component {
  constructor() {
    super(...arguments);
    this.elRef = (0, import_react.createRef)();
    this.isUpdating = false;
    this.isUnmounting = false;
    this.state = {
      customRenderingMap: /* @__PURE__ */ new Map()
    };
    this.requestResize = () => {
      if (!this.isUnmounting) {
        this.cancelResize();
        this.resizeId = requestAnimationFrame(() => {
          this.doResize();
        });
      }
    };
  }
  render() {
    const customRenderingNodes = [];
    for (const customRendering of this.state.customRenderingMap.values()) {
      customRenderingNodes.push(import_react.default.createElement(CustomRenderingComponent, { key: customRendering.id, customRendering }));
    }
    return import_react.default.createElement("div", { ref: this.elRef }, customRenderingNodes);
  }
  componentDidMount() {
    this.isUnmounting = false;
    const customRenderingStore = new CustomRenderingStore();
    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
    this.calendar = new Calendar(this.elRef.current, Object.assign(Object.assign({}, this.props), { handleCustomRendering: this.handleCustomRendering }));
    this.calendar.render();
    let lastRequestTimestamp;
    customRenderingStore.subscribe((customRenderingMap) => {
      const requestTimestamp = Date.now();
      const isMounting = !lastRequestTimestamp;
      const runFunc = (
        // don't call flushSync if React version already does sync rendering by default
        // guards against fatal errors:
        // https://github.com/fullcalendar/fullcalendar/issues/7448
        syncRenderingByDefault || //
        isMounting || this.isUpdating || this.isUnmounting || requestTimestamp - lastRequestTimestamp < 100 ? runNow : import_react_dom.flushSync
      );
      runFunc(() => {
        this.setState({ customRenderingMap }, () => {
          lastRequestTimestamp = requestTimestamp;
          if (isMounting) {
            this.doResize();
          } else {
            this.requestResize();
          }
        });
      });
    });
  }
  componentDidUpdate() {
    this.isUpdating = true;
    this.calendar.resetOptions(Object.assign(Object.assign({}, this.props), { handleCustomRendering: this.handleCustomRendering }));
    this.isUpdating = false;
  }
  componentWillUnmount() {
    this.isUnmounting = true;
    this.cancelResize();
    this.calendar.destroy();
  }
  doResize() {
    this.calendar.updateSize();
  }
  cancelResize() {
    if (this.resizeId !== void 0) {
      cancelAnimationFrame(this.resizeId);
      this.resizeId = void 0;
    }
  }
  getApi() {
    return this.calendar;
  }
};
FullCalendar.act = runNow;
var CustomRenderingComponent = class extends import_react.PureComponent {
  render() {
    const { customRendering } = this.props;
    const { generatorMeta } = customRendering;
    const vnode = typeof generatorMeta === "function" ? generatorMeta(customRendering.renderProps) : generatorMeta;
    return (0, import_react_dom.createPortal)(vnode, customRendering.containerEl);
  }
};
function runNow(f) {
  f();
}
export {
  FullCalendar as default
};
//# sourceMappingURL=@fullcalendar_react.js.map
