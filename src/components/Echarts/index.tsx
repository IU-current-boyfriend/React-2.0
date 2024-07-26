import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useDebounceFn } from "ahooks";
import echarts, { ECOption } from "./config";
import { ECElementEvent, EChartsType } from "echarts";

export interface EChartProps {
  option: ECOption | null | undefined;
  width?: number | string;
  height?: number | string;
  merge?: boolean;
  loading?: boolean;
  empty?: React.ReactElement;
  onClick?: (event: ECElementEvent) => any;
}

export interface EChartsRef {
  instance(): EChartsType | undefined;
}

const EchartInner: React.ForwardRefRenderFunction<EChartsRef, EChartProps> = (
  { option, width, height, onClick },
  ref: ForwardedRef<EChartsRef>
) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true);

  const echartsStyle = useMemo(() => (width || height ? { height, width } : { height: "100%", width: "100%", flex: 1 }), []);
  const { run } = useDebounceFn(() => cInstance.current?.resize({ animation: { duration: 300 } }), { wait: 300 });
  const handleClick = useCallback((event: ECElementEvent) => onClick && onClick(event), [onClick]);

  useEffect(() => {
    if (cRef.current) {
      // cInstance.current表示DOM元素上绑定的实例对象，未echats.init初始化之前不存在的
      cInstance.current = echarts.getInstanceByDom(cRef.current) as ReturnType<EChartsRef["instance"]>;

      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, { renderer: "svg" }) as unknown as ReturnType<
          EChartsRef["instance"]
        >;
        cInstance.current?.on("click", handleClick);
      }
      option && cInstance.current?.setOption(option);
    }
  }, [cRef, option, handleClick]);

  useEffect(() => {
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, [run]);

  useLayoutEffect(() => {
    // 其实是优化，当echarts的尺寸变化之后，我们同步更新，在ui渲染之前,因为echart中resize方法可以设置width、height配置
    if (!isFirstRun) return run();
    setIsFirstRun(false);
  }, [width, height, run]);

  useImperativeHandle(ref, () => ({
    instance: () => {
      return cInstance.current;
    }
  }));

  return <div ref={cRef} style={echartsStyle} />;
};

const Echarts = React.memo(React.forwardRef(EchartInner));

export default Echarts;
