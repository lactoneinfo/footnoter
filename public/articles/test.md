---
title: test
publishedAt: "2023-06-24"
updatedAt: "2024-09-09"
author:
    name: "lactoneinfo"
    iconUrl: "public/next.svg"

---

## intro

お勉強をしていて面白いと思ったことなど共有していきたいと思いブログ開設してみました. 

とはいえ、8月中旬に院試を控えておりまして、当面はそのお勉強になるので、過去問に関連した話題ばかりになりそうです.

計数工学科数理コースの内部生で院試に落ちたとはあまり聞かないので、そんなに落ちるような試験ではないのかな、とこれまで何もしていなかったものの、いざ過去問を解いてみるとなかなか難しい. 何問解けば受かるんでしょう...

## question

さて、2024年の院試第一問について

<pre>
問題:
[tex: 
\begin{aligned}
&\text{given} && X, Y \in \mathbb{R}^{m \times n} \\
&\text{minimize} && \| PX - Y \|_{F} \\
&\text{subject to} && P \text{ は直交行列}
\end{aligned}
]
</pre>

ここで行列のノルムはフロべニウスノルムとします。[tex: \| A \|\_{F} = \sum\_{i=1}\^{m} \sum\_{j=1}\^{n} a\_{ ij}\^{ 2} ]です.

すなわち、行列Xを直交変換(原点周りの回転及び軸や面に対する対称変換)してYにフロベニウスノルムでどれだけ近づけられるのか、という問題です. 

このような問題は Procrustes 問題と呼ばれます. ギリシャ神話の盗賊 Προκρούστης が通りががった人に「休ませてやろう」と声をかけ、鉄の寝台に寝かせた上で、体が寝台を飛び出したら寝台に合うよう削り、逆に寝台の長さに足りなかったらピッタリになるまで体を伸ばすという拷問をかけていたことに由来するそうです. <s>拡大は直交変換ではないです.</s>

## answer

まず、この問題は主成分分析の根拠として登場する Eckart–Young–Mirsky の定理にとてもよく似ていますね.
**行列の最良低ランク近似がその特異値分解によって与えられる**という定理で、統計学において非常に重要な定理です.

<pre>
Eckart–Young–Mirsky の定理:
[tex:
\begin{aligned}
& A \in \mathbb{R}^{m \times n} :\text{ランク r } , \\
&\text{A の特異値分解を } A = U \Sigma V^{T} \text{とする}, \\
&\text{ここで } U \in \mathbb{R}^{m \times m}, \Sigma \in \mathbb{R}^{m \times n}, \text{ and } V \in \mathbb{R}^{n \times n} \text{. U, V は直交行列}. \\
&\text{Then, for any } k < r, \\
&\min_{B: \operatorname{rank}(B) \leq k} \|A - B\|_{F} = \|A - A_{k}\|_{F}, \\
&\text{ここで } A_{k} = U \Sigma_{k} V^{T} \text{で,} \Sigma_{k} \text{ は} \Sigma \text{で特異値大きい順に } k \text{ 個を残しこれ以外を0とした行列}.
\end{aligned}
]
</pre>


しかしこの問題では[tex: P]は直交行列なので、[tex: PX]が rank [tex: PX = k] の任意の行列を表現することはできず、この定理は直接適用できません(直交行列の各行・列は規格化されている必要があり拡大縮小にあたる操作を行えないため). 

とはいえ方針はEckart–Young–Mirsky の証明ステップと(途中までは)同じように考えます. 

フロベニウスノルムについて、[tex:  \| A \|_{F} = tr(A A\^{T})]が成り立つので

<pre>
[tex: 
\begin{aligned}
\|PX - Y\|_{F}^{2} &= \text{tr}((PX - Y)(PX - Y)^T) \\
               &= \text{tr}(PXX^T P^T - PXY^T - Y (PX)^T + YY^T) \\
               &= -2 \text{tr}(PXY^T) + \text{tr}(XX^T) + \text{tr}(YY^T)
\end{aligned}
]
</pre>

結局、 [tex:  \text{tr}(PXY\^{T})]を最大化する問題になります. ここで [tex: XY\^{T}=U \Sigma V\^{T}]のように特異値分解して,

<pre>
[tex:
\begin{aligned}
\text{tr}(PXY^T) &= \text{tr}(PU \Sigma V^T) \\
                 &= \text{tr}(\Sigma V^T PU) \\
                 &= \text{tr}(\Sigma G) \quad \text{（ここで } G = V^T PU \text{ とすると、 } G \text{ は直交行列）} \\
                 &= \sum_i^k \Sigma_{ii} G_{ii} \text{(} k \text{は特異値の個数)}
\end{aligned}
]
</pre>

ここで[tex: G]は直交行列なので、少なくとも特異値が続く限りは対角成分に[tex: 1]を置く必要があり、特異値が0になった後の行・列に関する配置は結果に影響しません. よって [tex: G = E ] (単位行列)とすればよくて、[tex: P=VU\^{T}]がこの問題の解になります.

ではでは