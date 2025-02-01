/**
 * A React component that renders a loading animation using the Framer Motion library.
 * The animation consists of a rotating and scaling SVG image with a transparent background.
 * This component can be used to indicate that content is being loaded or processed.
 */
import React from "react";
import * as motion from "motion/react-client";

const Loading: React.FC = () => {
  return (
    <motion.svg
      className="mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="41"
      viewBox="0 0 70 41"
      fill="none"
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: [0.5, 1.0, 1.5] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <defs>
        <image
          id="image_1"
          width="80"
          height="80"
          xlinkHref="data:image/png;base64,UklGRroDAABXRUJQVlA4TK0DAAAvT8ATECfEsG3bMFSx/1/dARvcNxy0jSRJTuv48zwGf3c4bNtGklNHef8LfvcQgTxniPHmeRxV7bwmkKqCQJL6vocgmpME8BMCQBD4C2c/TUN76pxDa8/6Q7AddCAApqO7LYMG0B1Q2+EMAO5C2R7NAAxI2CoX6tlNwloSdCIgFgEEAS5xBXKBqIDabdumJGmWbdtqu2zbZrtsG/uPZ0W8FzfiRbs/RPTfgdu2kaS92s4lzGSy6TwBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCzPddeJUmSJEmSJEmSJEmSJEmSJC9vnlg9rqvWjEtJkiS9XPTu0KTyz7KnebBmzvBensWRM789/i6vfyhuP83hEQ1cmfEHP2TnoDKjSzk8qJlr/dWr7CjbWx6MaCp4Vr7J1yU2e7KmuWj8Lo/HFMhcy+y2A0w49rI2Ek9MH9DqrFOidSYbCniZEW2+TzqpPhmvk06Z1sI8HtaZpG1Px3JyfG3UnMqRAp0irV/yTQmV3XbwnZjnnXXKtL7P2RIqe+pSp9h29OsPU5ung8+BbOwzVuTO4P5i0I183jidfNYMRFi/UA3Z92/HNk1Hn1NZ3VNeZEJx3FcVvsyvPeVETtW/q8nkdI5VHYY8zPxCfrxC3fiATnuSf1ycN6bViG/PrkKuXKZufOA8Va7zkRclrRfHptWJzxo45z3qdJV+Oyv+6fPzT/1BvcpfK63I778d/Q3g0z3XX726vueTfmHqlWoGujSla+YkbXmxhLqsueR5W6E7fO7aB3m+qFtuJW15sYSarDnj2cdCt1IRH8nTaSV0kuiiU/krbhW6NRJHc75BKqVCpdCtNB9mWdPsbyt0h267f2/LUKzL3qb5va3Q3draejPm5rfuuN2LOU5boXsvixbnXqtbrPcxPlt8cbt3LF6cu13xMT67vY07dba0TDe1d5qeU+7L2tYqW+7d3dRaZf3AKk2zPA9G1lmMepSljU96L+ZI3X10LOean0RPf5qjIyvtY3kytQ9m5Yue5eG6eSNGzFv/KM8W9MU0f8rFaixemNwvDw5W7b766tXV3Sv/b/G8EQA="
        />
        <pattern
          id="pattern_2"
          patternTransform="scale(0.397 0.397)"
          width="3.521"
          height="3.521"
        >
          <use xlinkHref="#image_1" />
        </pattern>
        <image
          id="image_3"
          width="80"
          height="80"
          xlinkHref="data:image/png;base64,UklGRlwEAABXRUJQVlA4TE8EAAAvT8ATEJ/EqI0kR649/lzvnXYvkHDUNpIgOb38WS6Ge+11B8O2bcMGRyXttuRZByx5eRiGGPtUtueMGT89W1UQSDq+TYJoXgF8QgAIgq4KKP/JCKEOMO8Huh8Q5EAAzDtAADp26jDABJB2ZsfCGGDdqeaOKQETSFioXIBOUnNJWDNIWiAgljj4BaAlAA4IQAGt29oOSdJu27Y9Ztu2bY1n2rat9xdXRcQX8UXV5VxE9N+B2zaO5KvxbNEkUw73BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHxz+nVEREREREREREREREREREREREREPPtzxeAWXhsiIiJaM+4tyP8e71cMbS2Dg78+H+9m57KdiRVJit8vVsgas/TcHo9ze/0q0lwXL1TI6liSz5NxskeeItoeNUMextJctT4Mv/ryflKuGtl5LDviUp9MNbLzWPpcih15QRdMvPHv4tssdcVMXhZPhrVt57L0KG7Vsp3NMvRxLMsNuuRWzRURERER0fKK9Or8jiUzBjVWF576/Lftv87o27rdMKHDFi7f//eb0qGfrh5d//3YHl1np5el0d+tPXL5Y+nUB8t6lNQddpZek37acvxuxIGqfXtRcoxfLEgu1oz7KkzmqYuex4+dh5SfiRpVkC/U2FWY3Mv+HH8VQXsn5bp3io6+7Ua6Xc5vImhn3WhhO+hQ4pDMcd+2Sj9GukmQVDc45HZjZdhtnTSxc3akUBfsufb69bXd87PtCuTua69fX+2ArNGtztlRRR11sbpanR+ZmYMUZGl2jSySV2QjYmIynvYyHq6a2K/fpNUP4+W07NeMNOSUxIS+mdKYl3GofxlhwOF4PjrTHvsiDfmimsaOU1I6H4d6JDa6I3EmbTfYCOshm2hOPCx1tNLZRzGrmdccckZVL+PYyhm9sTdWFSvo1vv3NvfCmtiTpX31kLswbsnBeLnsc0R8+GPbD9djArYUmdqESXEpy75cD3lj8cH7EfF5heG/7PjnU2m8FZm7F9Omx70idzn7X3PI+wcXj6wkfsG6E58raNOnx902VA/56eCScXWp+6+Uus0F48ZykLKbBPWQ/zYq7eqitJvv3d1YlHZtziHFoKmH3N1s6A1IUQx8HDOzNLsBZJOpcTYOp6bG0TidOc3P1UGeSqIl5vnzODKg0tGj8WxUSi1APm0IOf1FPFozuX//yWsfx4spTdeh1KKVhHw2tSnbyHPVUXh2RHKdzIc8kwM5b+eV16+v7Jyb3gVagPx/4Z96AAA="
        />
        <pattern
          id="pattern_4"
          patternTransform="scale(0.397 0.397)"
          width="3.521"
          height="3.521"
        >
          <use xlinkHref="#image_3" />
        </pattern>
      </defs>
      <g>
        <rect width="70" height="41" />
        <g id="Group" transform="translate(4 0)">
          <rect
            id="Rectangle"
            width="31.737"
            height="31.737"
            fill="url(#pattern_2)"
            fillRule="evenodd"
          />
          <rect
            id="Rectangle"
            width="31.737"
            height="31.737"
            fill="url(#pattern_4)"
            fillRule="evenodd"
            transform="translate(29.753 0.793)"
          />
        </g>
      </g>
    </motion.svg>
  );
};

export default Loading;
