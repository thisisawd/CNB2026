import svgPaths from "./svg-abc77eltca";
import imgImage11 from "figma:asset/576b9f5e7b0658ffb297b7ae32f59e4451197755.png";

function Group() {
  return (
    <div className="absolute h-[30.722px] left-[13.65px] top-[194px] w-[31.534px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 31">
        <g id="Group 1197">
          <rect fill="var(--fill-0, white)" height="30.7222" id="Rectangle 57" width="31.5342" />
          <path d={svgPaths.p139bc3c0} fill="var(--fill-0, #267B1F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[142.194px] left-[11.58px] top-[28.48px] w-[35.561px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 143">
        <g id="Group 1198">
          <rect fill="var(--fill-0, white)" height="30.7222" id="Rectangle 57" width="34.3379" y="111.472" />
          <path d={svgPaths.p23a29332} fill="var(--fill-0, #228286)" id="Vector" />
          <g id="Group 1197">
            <rect fill="var(--fill-0, white)" height="30.7222" id="Rectangle 57_2" width="33.792" x="1.03531" y="55.7603" />
            <path d={svgPaths.p1288ab00} fill="var(--fill-0, #8363C1)" id="Vector_2" />
          </g>
          <g id="Group 1198_2">
            <rect fill="var(--fill-0, white)" height="30.7222" id="Rectangle 57_3" width="35.043" x="0.517867" y="9.53674e-06" />
            <path d={svgPaths.p31b25500} fill="var(--fill-0, #7FB3E4)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[240.5px] left-0 top-0 w-[648px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage11} />
      </div>
      <Group />
      <Group2 />
    </div>
  );
}