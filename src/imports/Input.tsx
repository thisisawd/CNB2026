import svgPaths from "./svg-h2hateftr2";

function Text() {
  return (
    <div className="basis-0 grow h-[34px] min-h-px min-w-px relative shrink-0" data-name=".Text">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[34px] items-start px-[2px] py-[6px] relative w-full">
          <p className="basis-0 font-['Segoe_UI:Regular',sans-serif] grow h-full leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px]">&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

function IconTextStack() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Icon-Text-stack">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[12px] py-0 relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Contents">
      <div className="content-stretch flex gap-[10px] h-[40px] items-center overflow-clip relative rounded-[inherit] w-full">
        <IconTextStack />
      </div>
      <div aria-hidden="true" className="absolute border border-[#b3b3b3] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function Input() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] size-full" data-name="Input">
      <Contents />
      <div className="absolute bg-[#7719aa] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thick underline" />
      <div className="absolute bottom-0 h-[2px] left-[36.43%] right-[36.07%]" data-name="Pressed">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(15, 84, 140, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 2">
            <path d={svgPaths.p6fb8400} fill="var(--fill-0, #0F548C)" id="Pressed" />
          </svg>
        </div>
      </div>
    </div>
  );
}