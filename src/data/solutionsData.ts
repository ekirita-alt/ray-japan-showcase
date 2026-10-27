export interface SolutionItem {
  id: string;
  title: string;
  desc: string;
  videoUrl: string;
  image: string;
  badge?: string;
  features: string[];
  specs?: { label: string; value: string }[];
  interactiveType: string;
  groupId?: string;
  groupTitle?: string;
}

export interface SolutionGroup {
  id: string;
  title: string;
  items: SolutionItem[];
}

export type SolutionEntry = 
  | { type: 'item'; item: SolutionItem }
  | { type: 'group'; group: SolutionGroup };

export interface SolutionCategory {
  id: string;
  title: string;
  subText: string;
  leadDesc: string;
  heroImage: string;
  gdriveId?: string;
  imagePosition?: string;
  entries: SolutionEntry[];
  items: SolutionItem[];
}

import rayfaceImg from '../assets/images/rayface_facial_scanner_1791215315311.jpg';
import rayfacePlanesImg from '../assets/images/rayface_software_planes_1791217386477.jpg';
import rayfaceDeviceStudioImg from '../assets/images/rayface_device_studio_1791218470335.jpg';
import rayfaceGdriveImg from '../assets/images/rayface_gdrive.png';
import rayscanImg from '../assets/images/dental_ct_rayscan_1791215326073.jpg';
import raymillImg from '../assets/images/raymill_chairside_cadcam_1791215336627.jpg';
import cadcamCrownDesignImg from '../assets/images/cadcam_crown_design_1791218749931.jpg';
import cadcamCrown46Img from '../assets/images/cadcam_crown_46_1791219026968.jpg';
import cadcamGdriveImg from '../assets/images/cadcam_gdrive.png';
import software5dImg from '../assets/images/ray_5d_software_screen_1791215347353.jpg';
import software5dAnatomicalFaceImg from '../assets/images/ray_5d_anatomical_face_1791217565850.jpg';
import software5dGdriveImg from '../assets/images/5d_gdrive.png';
import lineupPremiereImg from '../assets/images/lineup_premiere.png';

// Helper to flatten entries to items
const flattenEntries = (entries: SolutionEntry[]): SolutionItem[] => {
  const result: SolutionItem[] = [];
  for (const entry of entries) {
    if (entry.type === 'item') {
      result.push(entry.item);
    } else if (entry.type === 'group') {
      result.push(...entry.group.items);
    }
  }
  return result;
};

// ==========================================
// 1. RAY 5D Concept
// ==========================================
const fiveDEntries: SolutionEntry[] = [
  {
    type: 'item',
    item: {
      id: "what-is-5d",
      title: "5Dとは？",
      desc: "従来のCT（3D）にAI機能とRAYFaceの顔貌データを加え『3D＋2つの要素』で5DとRAYが名付けました。搭載されたAI Segmentation機能により、DICOMの形式から解剖学的な構造（歯根、下顎管、上顎洞、気道など）に自動で分けてSTL変換をしてくれます。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: software5dGdriveImg,
      badge: "3D ＋ AI ＋ 顔貌データ",
      features: [
        "従来のCT（3D）にAI機能とRAYFaceの顔貌データを加えた『3D＋2つの要素』",
        "AI Segmentation機能搭載：DICOM形式から解剖学的構造を自動判別",
        "歯根、下顎管、上顎洞、気道などを個別の高精度STLデータへ自動変換",
        "骨格・歯列・軟組織を完全融合したバーチャルペイシェントをワンストップ構築"
      ],
      specs: [
        { label: "5Dの定義", value: "従来のCT(3D) ＋ AI機能 ＋ 顔貌データ" },
        { label: "搭載AI", value: "AI Segmentation (解剖構造の自動分割)" },
        { label: "データ変換", value: "DICOM → 解剖構造別 STL自動変換" }
      ],
      interactiveType: "5d-concept"
    }
  },
  {
    type: 'group',
    group: {
      id: "case",
      title: "Case",
      items: [
        {
          id: "implant-planning",
          title: "Implant planning",
          desc: "下顎管のAI自動検出や骨密度カラーマップを活用し、解剖学的リスクを回避した精密なインプラント埋入シミュレーションを提供します。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: software5dAnatomicalFaceImg,
          badge: "AI下顎管トレース・骨密度解析",
          groupId: "case",
          groupTitle: "Case",
          features: [
            "下顎管（下歯槽神経）のAI自動トレース＆安全マージン警告（2mm基準）",
            "骨密度（HU値）カラーマッピングによる即時埋入トルク予測",
            "各社主要インプラントメーカーのライブラリ（Nobel / Straumann等）完備",
            "咬合圧軸と解剖学的骨形態を考慮したトップダウン設計"
          ],
          specs: [
            { label: "計測精度", value: "±0.05 mm" },
            { label: "骨密度解析", value: "Hounsfield単位(HU)" },
            { label: "対応メーカー", value: "Nobel / Straumann / 各種対応" }
          ],
          interactiveType: "5d-implant"
        },
        {
          id: "surgical-guide",
          title: "サージカルガイド設計",
          desc: "CT骨データとIOS歯列データを高精度に重ね合わせ、安全確実なガイデッドサージェリー用STLデータをチェアサイドで即時出力します。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: software5dImg,
          badge: "サージカルガイド即時出力",
          groupId: "case",
          groupTitle: "Case",
          features: [
            "インプラント埋入シミュレーションと連動したワンクリックガイド設計",
            "主要サージカルキットのスリーブライブラリ搭載",
            "アンダーカット・スリーブ干渉の自動チェック機能",
            "オープンSTL出力により院内3Dプリンターで即時造形可能"
          ],
          specs: [
            { label: "出力形式", value: "オープンSTL" },
            { label: "設計時間", value: "約3分" },
            { label: "ガイド方式", value: "歯肉支持 / 歯牙支持 / 骨支持" }
          ],
          interactiveType: "5d-guide"
        },
        {
          id: "orthodontics",
          title: "Orthodontics",
          desc: "AIセファロ自動トレースと骨格型判定により、患者の顔貌プロファイルと歯列変化を直感的に共有できる次世代矯正診断・コンサルテーション機能です。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: software5dImg,
          badge: "AIセファロ・顔貌連動 矯正診断",
          groupId: "case",
          groupTitle: "Case",
          features: [
            "AIによるセファロランドマーク自動同定（約3秒で32箇所認識）",
            "Downs法、Steiner法、Northwestern法など多彩な分析規格",
            "骨格型判定と術前術後モーフィング比較（Before / After）",
            "患者自身の顔写真上で歯列後退・口元変化を可視化"
          ],
          specs: [
            { label: "分析速度", value: "約3秒 (AI自動同定)" },
            { label: "規格数", value: "主要10種以上の矯正分析法" },
            { label: "レポート出力", value: "患者説明用ビジュアルPDF" }
          ],
          interactiveType: "5d-ortho"
        },
        {
          id: "endodontics",
          title: "Endodontics",
          desc: "超微細ボクセルCT画像とAI根管セグメンテーションにより、複雑な彎曲根管や微小根尖病変、MB2などの副根管を3Dで明瞭に可視化・計測する歯内療法専用診断機能です。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: software5dImg,
          badge: "超微細根管解析・歯内療法診断",
          groupId: "case",
          groupTitle: "Case",
          features: [
            "AIによる微細根管経路の自動抽出と3Dカラーレンダリング",
            "複雑な彎曲根管の曲率・作業長（WL）精密デジタル計測",
            "MB2（近心頬側第2根管）やC-shaped根管の明瞭同定",
            "破折線・パーフォレーション・微小根尖病変の高精細スライス表示"
          ],
          specs: [
            { label: "最小ボクセル", value: "70 μm 超微細解像度" },
            { label: "根管抽出", value: "AI自動セグメンテーション" },
            { label: "計測機能", value: "根管長・彎曲角度リアルタイム計測" }
          ],
          interactiveType: "5d-endo"
        },
        {
          id: "pediatric-dentistry",
          title: "小児歯科",
          desc: "骨年齢判定や上気道ボリューム解析、低線量撮影プロトコルを統合し、小児の健全な成長発育を多角的にサポートします。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: software5dImg,
          badge: "成長予測・気道ボリューム解析",
          groupId: "case",
          groupTitle: "Case",
          features: [
            "骨年齢判定と成長ピーク予測カーブ表示",
            "上気道の狭窄度3Dボリュームカラー測定（断面積・体積自動計算）",
            "舌位・口呼吸に関する視覚的患者コンサル機能",
            "小児専用ウルトラロープロファイル（超低被爆撮影）連動"
          ],
          specs: [
            { label: "気道最小断面積", value: "自動計算 (mm²)" },
            { label: "体積計算", value: "3Dカラーグラデーション表示" },
            { label: "線量低減", value: "小児専用ウルトラ低線量" }
          ],
          interactiveType: "5d-pediatric"
        }
      ]
    }
  },
  {
    type: 'item',
    item: {
      id: "requirements",
      title: "推奨環境",
      desc: "RAY 5D Conceptをクリニック内で快適かつ安全に運用するための推奨PCスペック、ネットワーク構成、対応規格一覧です。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: software5dImg,
      badge: "システム推奨スペック・対応規格",
      features: [
        "OS: Windows 11 Pro 64-bit 推奨",
        "CPU: Intel Core i7 / i9 (第12世代以降) または AMD Ryzen 7 / 9",
        "GPU: NVIDIA GeForce RTX 3060以上 (VRAM 8GB以上推奨)",
        "メモリ: 32GB RAM以上 (推奨64GB) / 高速NVMe SSD 1TB以上",
        "ネットワーク: 1Gbps / 10Gbps 院内LAN環境、DICOM 3.0完全準拠"
      ],
      specs: [
        { label: "推奨OS", value: "Windows 11 Pro (64bit)" },
        { label: "推奨GPU", value: "NVIDIA RTX 4060 / 3070 以上" },
        { label: "推奨メモリ", value: "32GB〜64GB" }
      ],
      interactiveType: "5d-env"
    }
  }
];

// ==========================================
// 2. RAYFace
// ==========================================
const rayfaceEntries: SolutionEntry[] = [
  {
    type: 'item',
    item: {
      id: "what-is-rayface",
      title: "RAYFaceとは？",
      desc: "RAYFaceは、わずか0.5秒のワンショットで自然な表情の高精度3D顔貌モデルをキャプチャし、CT骨格や口腔内スキャンと完全同期させる革新的3Dフェイシャルスキャナーです。顔貌のリップラインや瞳孔間線に基づいた次世代の審美・インプラント・矯正治療を実現します。",
      videoUrl: "/videos/rayface_promo.mp4",
      image: rayfaceImg,
      badge: "次世代 3Dフェイシャルスキャナー",
      features: [
        "わずか0.5秒のワンショット撮影で瞬きや体動ブレのない自然な表情を即座に生成",
        "CT骨格データ・口腔内スキャンとAI自動マッチングし、生体3D仮想患者を構築",
        "顔貌の正中線・リップライン・瞳孔間線に基づく精密な補綴・矯正・審美診断",
        "オープンフォーマット（OBJ / PLY / STL）出力によりexocad等主要CADソフトと即時連携"
      ],
      specs: [
        { label: "撮影速度", value: "0.5 秒 (ワンショット)" },
        { label: "搭載カメラ", value: "6基 CMOSステレオカメラ" },
        { label: "統合データ", value: "Face 3D + DICOM + IOS STL" }
      ],
      interactiveType: "rayface-oneshot"
    }
  },
  {
    type: 'group',
    group: {
      id: "key-feature",
      title: "KEY Feature",
      items: [
        {
          id: "oneshot",
          title: "One-Shot撮影",
          desc: "わずか0.5秒のワンショットで、高精度な3D顔貌データを取得。患者への負担を最小限に抑えます。",
          videoUrl: "/videos/rayface_oneshot.mp4",
          image: rayfaceImg,
          badge: "瞬時0.5秒キャプチャ",
          groupId: "key-feature",
          groupTitle: "KEY Feature",
          features: [
            "6台の高精度ステレオカメラによる同期フラッシュ撮影",
            "まばたきや頭部移動によるブレを徹底排除",
            "着座したまま自然な笑顔をキャプチャ可能",
            "小児から高齢者までストレスフリーな撮影体験"
          ],
          specs: [
            { label: "撮影速度", value: "0.5 秒 (ワンショット)" },
            { label: "搭載カメラ", value: "6基 CMOSステレオ" },
            { label: "光源", value: "安全基準適合LEDストロボ" }
          ],
          interactiveType: "rayface-oneshot"
        },
        {
          id: "automatch",
          title: "AI Autoマッチング",
          desc: "AIが顔貌データと口腔内スキャンデータ（またはCTデータ）を自動でマッチングし、仮想患者を瞬時に構築します。",
          videoUrl: "/videos/rayface_automatch.mp4",
          image: rayfacePlanesImg,
          badge: "AI 仮想患者 (Virtual Patient)",
          groupId: "key-feature",
          groupTitle: "KEY Feature",
          features: [
            "目視マーカー不要のAI解剖学的ランドマークマッチング",
            "CT骨格データ + 口腔内スキャン歯列 + 表情3Dメッシュを完全統合",
            "わずか数秒で仮想患者（バーチャルペイシェント）を構築",
            "マッチング誤差をカラーヒートマップで検証可能"
          ],
          specs: [
            { label: "自動合致速度", value: "約5〜8秒" },
            { label: "整合精度", value: "Sub-millimeter級 高精度" },
            { label: "統合対象", value: "Face OBJ + DICOM + IOS STL" }
          ],
          interactiveType: "rayface-automatch"
        }
      ]
    }
  },
  {
    type: 'group',
    group: {
      id: "softwares",
      title: "Softwares",
      items: [
        {
          id: "ray-fusion",
          title: "RAY Fusion",
          desc: "CTの骨格DICOM、口腔内スキャンの歯列STL/PLY、RAYFaceの3D顔貌OBJを単一の3D空間で完全統合・同期するコアプラットフォームソフトウェアです。",
          videoUrl: "/videos/rayface_automatch.mp4",
          image: rayfacePlanesImg,
          badge: "マルチモダリティ3D統合ソフト",
          groupId: "softwares",
          groupTitle: "Softwares",
          features: [
            "DICOM骨格・IOS歯列・Face顔貌メッシュを共通三次元座標系で完全同期",
            "AIによる解剖学的特徴点アライメントとカラーヒートマップによる誤差検証",
            "骨と軟組織・歯列の解剖学的相関を直感的に3D断面・透過表示",
            "各CAD/CAMソフトウェアおよび診断ツールへの一元シームレスエクスポート"
          ],
          specs: [
            { label: "統合対象", value: "DICOM + STL/PLY + OBJ" },
            { label: "AI自動照合", value: "約5秒 高速演算" },
            { label: "座標管理", value: "共通基準原点・咬合平面保持" }
          ],
          interactiveType: "rayface-automatch"
        },
        {
          id: "smile-design",
          title: "3D Smile Design",
          desc: "黄金比やリップラインに調和した3Dスマイルデザイン。術後の美しい笑顔を患者自身の3Dフェイス上で直感的に提示し、自費成約率を高めます。",
          videoUrl: "/videos/rayface_smiledesign.mp4",
          image: rayfaceImg,
          badge: "Digital Smile Design",
          groupId: "softwares",
          groupTitle: "Softwares",
          features: [
            "黄金比（1:1.618）と顔貌プロポーションに合わせた歯冠デザイン",
            "患者の笑顔写真上に理想のスマイルアークを瞬時に描画",
            "術前術後（Before / After）のスライダー直感比較",
            "患者自身のスマートフォンへシミュレーション共有可能"
          ],
          specs: [
            { label: "歯冠ライブラリ", value: "20種以上の審美モールド" },
            { label: "比率分析", value: "黄金比 / 幅径長比自動算出" },
            { label: "コンサル同意率", value: "導入医院平均 +42% 向上" }
          ],
          interactiveType: "rayface-dsd"
        },
        {
          id: "ortho-simulator",
          title: "Ortho Simulator",
          desc: "矯正治療後の顔貌の変化をシミュレーション。抜歯・非抜歯の比較やEラインの変化を視覚的に提示し、自費矯正の契約率を大幅に向上させます。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayfaceImg,
          badge: "軟組織プロファイル変化予測",
          groupId: "softwares",
          groupTitle: "Softwares",
          features: [
            "前歯後退に伴うEライン（E-line）や口元の軟組織変化を可視化",
            "抜歯 vs 非抜歯プランのサイドバイサイド同時比較",
            "オトガイ突出度や下唇の巻き込み改善を3Dでシミュレート",
            "患者が納得して自費矯正を選択できる決定打となる視覚ツール"
          ],
          specs: [
            { label: "基準線", value: "Rickett's E-Line / Holdaway線" },
            { label: "プラン比較", value: "最大3パターン同時比較" },
            { label: "軟組織応答", value: "解剖学的弾性モデル準拠" }
          ],
          interactiveType: "rayface-orthosim"
        },
        {
          id: "smart-ortho",
          title: "Smart Ortho",
          desc: "包括的なデジタル矯正診断・アライナー治療計画システム。AIによる自動ステージングと顔貌調和シミュレーションをワンストップで実現します。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayfacePlanesImg,
          badge: "次世代AI包括矯正システム",
          groupId: "softwares",
          groupTitle: "Softwares",
          features: [
            "アライナー矯正の各ステップ（ステージング）を顔貌変化と連動表示",
            "IPR・アタッチメント位置の自動提案機能",
            "咬合接触関係と審美スマイルラインの両立を検証",
            "患者専用ビューワーアプリを通じた進捗トラッキング"
          ],
          specs: [
            { label: "計画方式", value: "AI自動ステージング ＋ 医師微調整" },
            { label: "連携形式", value: "アライナー造形用STL一括書き出し" },
            { label: "診断対応", value: "叢生 / 空隙歯列 / 過蓋咬合 / 開咬" }
          ],
          interactiveType: "rayface-smartortho"
        }
      ]
    }
  },
  {
    type: 'group',
    group: {
      id: "thirdparty-integration-group",
      title: "3rd party 連携",
      items: [
        {
          id: "invivo7",
          title: "Invivo7",
          desc: "Anatomage社の世界標準3D医用画像処理ソフトウェア「Invivo7」と連携。RAYFaceの超高精細3D顔貌モデルとCBCTデータを統合し、気道分析・顎顔面外科・矯正診断を高度にサポートします。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayfaceDeviceStudioImg,
          badge: "Invivo 7 医用画像高度連携",
          groupId: "thirdparty-integration-group",
          groupTitle: "3rd party 連携",
          features: [
            "RAYFaceのカラー3D顔貌データをInvivo7の3Dボリュームレンダリングへ直接統合",
            "気道体積（Airway）測定や顎顔面骨格と軟組織の包括的セファロ分析",
            "顎変形症・外科矯正・睡眠時無呼吸（OSA）治療計画への応用",
            "高品質な術前シミュレーションによる患者カウンセリングの質向上"
          ],
          specs: [
            { label: "開発元", value: "Anatomage" },
            { label: "連携データ", value: "3D Face OBJ + DICOM 3Dボリューム" },
            { label: "主用途", value: "顎顔面外科 / 気道解析 / セファロ分析" }
          ],
          interactiveType: "rayface-automatch"
        },
        {
          id: "exocad",
          title: "exocad",
          desc: "世界標準のCADソフト「exocad DentalCAD」と完全ネイティブ連携。バーチャルペイシェント上で直接クラウン・ブリッジ・ベニアを設計可能です。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayfaceDeviceStudioImg,
          badge: "exocad DentalCAD ネイティブ連携",
          groupId: "thirdparty-integration-group",
          groupTitle: "3rd party 連携",
          features: [
            "exocadプロジェクト内へテクスチャ付き3Dフェイスをダイレクト読み込み",
            "顔貌のリップライン・正中線を見ながら審美クラウンを3D設計",
            "Smile Creatorモジュールとのシームレスなデータ同期",
            "技工士との共通プラットフォームで修正・再製を徹底防止"
          ],
          specs: [
            { label: "対応バージョン", value: "exocad Galway / Rijeka / Elefsina 以降" },
            { label: "転送データ", value: "3D Face OBJ + カラーマップ + 咬合基準" },
            { label: "連携方式", value: "ワンクリックダイレクトインポート" }
          ],
          interactiveType: "rayface-exocad"
        },
        {
          id: "exoplan",
          title: "exoplan",
          desc: "インプラントガイデッドサージェリー設計ソフト「exoplan」と高精度連携。RAYFaceの顔貌データ・CT・口腔内スキャンを統合し、審美性と解剖学的安全性を両立したインプラント治療計画とサージカルガイド設計を実現します。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayfaceDeviceStudioImg,
          badge: "exoplan ガイド設計連携",
          groupId: "thirdparty-integration-group",
          groupTitle: "3rd party 連携",
          features: [
            "exoplan内へRAYFaceの顔貌データをダイレクト統合し、唇や歯肉ラインに合わせたトップダウンインプラントプランニング",
            "CT骨データおよびIOS歯列データとの精密マッチングによる安全なインプラント埋入深度・傾斜角シミュレーション",
            "サージカルガイド設計モジュールへのシームレスな受け渡しとオープンSTL出力",
            "術前審美シミュレーション（Smile Creator）とインプラント埋入計画の完全同期"
          ],
          specs: [
            { label: "対応ソフト", value: "exoplan (最新全バージョン対応)" },
            { label: "ガイド出力形式", value: "オープンSTL (各社3Dプリンター対応)" },
            { label: "連携データ", value: "3D Face + DICOM + IOS STL" }
          ],
          interactiveType: "rayface-exoplan"
        }
      ]
    }
  },
  {
    type: 'item',
    item: {
      id: "digital-facebow",
      title: "Digital face-bow transfer",
      desc: "物理的なフェイスボウの装着や印象採得の手間を排除。RAYFaceの0.5秒撮影だけで解剖学的基準平面と咬合平面を完全デジタル採得します。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: rayfacePlanesImg,
      badge: "フェイスボウ完全デジタル化",
      features: [
        "物理フェイスボウ不要：患者への不快感やチェアタイムをゼロ化",
        "カンペル平面（Camper）・フランクフルト平面（FH平面）の自動同定",
        "瞳孔間線に対する咬合平面の傾き・対称性の高精度デジタル計測",
        "バーチャル咬合器（Virtual Articulator）への即時マウント"
      ],
      specs: [
        { label: "所要時間", value: "約0.5秒 (物理フェイスボウ比 -15分)" },
        { label: "同定平面", value: "Camper / Frankfort / Bipupillary" },
        { label: "咬合器互換", value: "Artex / SAM / KaVo / Giroform" }
      ],
      interactiveType: "rayface-planes"
    }
  },
  {
    type: 'item',
    item: {
      id: "ray-etray",
      title: "RAY eTray",
      desc: "高精度な専用トレイ・治具と連携し、無歯顎やフルマウス再建における歯列・粘膜・顎位の基準を確実にキャプチャするデジタルソリューションです。",
      videoUrl: "/videos/ray_etray.mp4",
      image: rayfacePlanesImg,
      badge: "フルアーチ・無歯顎精密採得",
      features: [
        "無歯顎・咬合崩壊症例における顎位決定と3D顔貌の正確な紐付け",
        "専用ジグによる光学スキャン・アライメント精度の飛躍的向上",
        "オールオンフォー（All-on-X）やフルデンチャーの確実な基準設定",
        "技工所との誤差のない咬合高径（VDO）データ共有"
      ],
      specs: [
        { label: "適応症例", value: "無歯顎 / フルアーチ補綴 / All-on-X" },
        { label: "整合方式", value: "光学式リファレンスジグ" },
        { label: "誤差低減", value: "従来法比 約60%向上" }
      ],
      interactiveType: "rayface-etray"
    }
  },
  {
    type: 'item',
    item: {
      id: "dynamic-occlusion",
      title: "Dynamic Occlusion",
      desc: "下顎運動（前方位・側方位・開口）をリアルタイムに3Dデジタルシミュレーションし、顆路角・ベネット角等の咬合パラメータを自動計測。exocadとの完全連携により高精度な機能的補綴設計を実現します。",
      videoUrl: "/videos/dynamic_occlusion.mp4?v=2",
      image: rayfacePlanesImg,
      badge: "動的咬合・下顎運動シミュレーション",
      features: [
        "追加デバイス不要でRAYFace内で下顎運動（前方・側方・開口）を精密再現",
        "顆路傾斜角、ベネット角、切歯点運動軌跡の自動計算とレポート出力",
        "IOSバイトデータやサードパーティ下顎運動ファイルとの柔軟なデータ統合",
        "exocad DentalCAD™への仮想咬合器パラメータ自動インポート連携"
      ],
      specs: [
        { label: "運動再現", value: "前方・側方・開口 リアルタイム3D" },
        { label: "出力レポート", value: "RAY Dynamic Occlusion Report (PDF/XML)" },
        { label: "CAD連携", value: "exocad DentalCAD™ ネイティブ連携" }
      ],
      interactiveType: "rayface-planes"
    }
  }
];

// ==========================================
// 3. CAD／CAMソリューション
// ==========================================
const cadcamEntries: SolutionEntry[] = [
  {
    type: 'item',
    item: {
      id: "rayios-raymill-c",
      title: "RAYiOS・RAY Mill C",
      desc: "超軽量・高精度な口腔内スキャナー「RAYiOS」と、高速・高剛性チェアサイドミリングマシン「RAY Mill C」によるシームレスな即日CAD/CAMトリートメントシステム。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "スキャン＆ミリング 直結連携システム",
      features: [
        "超軽量（約180g）高速口腔内スキャナー「RAYiOS」によるストレスフリーな印象採得",
        "高剛性スピンドル搭載「RAY Mill C」による高精度・高速切削（クラウン単冠約12分）",
        "スキャンからミリングまで同一エコシステム内でダイレクトにデータ受け渡し",
        "院内ワンストップで即日修復（1Day トリートメント）を高い完成度で実現"
      ],
      specs: [
        { label: "スキャン方式", value: "RAYiOS 高速フルアーチ" },
        { label: "ミリング方式", value: "RAY Mill C (ウェット / ドライ両用)" },
        { label: "対応マテリアル", value: "ジルコニア / ガラスセラミック / PMMA / レジン" }
      ],
      interactiveType: "cadcam-oneday"
    }
  },
  {
    type: 'item',
    item: {
      id: "open-system",
      title: "Open System",
      desc: "主要なすべての口腔内スキャナー(IOS)やミリングマシンに対応。特定メーカーに縛られない完全オープンなデジタル環境を構築します。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "マルチiOS対応オープン設計",
      features: [
        "iTero、Medit、3Shape TRIOS、Primescan等のデータをそのままインポート",
        "メーカー縛りのないオープンアーキテクチャで設備投資を最適化",
        "標準STL / PLY / OBJフォーマットに完全対応",
        "将来の機器追加やリプレイスにも柔軟に対応可能"
      ],
      specs: [
        { label: "対応スキャナー", value: "主要全社iOS (オープンSTL/PLY)" },
        { label: "取込所要時間", value: "即時（ドラッグ＆ドロップ対応）" },
        { label: "拡張性", value: "各社ミリングマシン / 3Dプリンター連携" }
      ],
      interactiveType: "cadcam-ios"
    }
  },
  {
    type: 'item',
    item: {
      id: "oneday-treatment",
      title: "1Day トリートメント",
      desc: "チェアサイドでの設計からミリングまでを迅速に行い、最短40分で即日修復（1Dayトリートメント）のワンストップワークフローを確立します。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "最短40分 即日装着",
      features: [
        "スキャンから装着まで患者が当日中に帰宅できるワンデイ補綴",
        "仮歯不要、再麻酔不要による患者満足度の最大化",
        "高剛性RAY Millによる高速・精密ミリング（単冠約12分）",
        "ジルコニア・ハイブリッド・ガラスセラミックまで幅広い材料に対応"
      ],
      specs: [
        { label: "全工程所要時間", value: "約40〜60分 (スキャン〜装着)" },
        { label: "ミリング所要時間", value: "約12分 (クラウン1歯)" },
        { label: "来院回数", value: "2回以上 → わずか1回で完結" }
      ],
      interactiveType: "cadcam-oneday"
    }
  },
  {
    type: 'item',
    item: {
      id: "inhouse-benefits",
      title: "内製化メリット",
      desc: "外注コストの削減、納期の即時化、再製リスクの軽減など、ラボワークを内製化することの経営的メリットを提示します。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "高いROIと医院収益力強化",
      features: [
        "技工外注費の大幅削減（1歯あたり原価約1/3〜1/5に圧縮）",
        "納期の即時化によりキャンセル率・脱落率をゼロ化",
        "色調・形態のチェアサイド即時微調整で再製ゼロを実現",
        "自費率アップと医院ブランドの差別化を強力に牽引"
      ],
      specs: [
        { label: "1歯あたりコスト", value: "外注約1.5万円 → 原価約3,000円" },
        { label: "年間想定削減額", value: "月30歯の場合 約430万円/年" },
        { label: "投資回収期間", value: "平均 1.2〜1.8 年" }
      ],
      interactiveType: "cadcam-inhouse"
    }
  }
];

// ==========================================
// 4. 製品Lineup (Total Lineup)
// ==========================================
const lineupEntries: SolutionEntry[] = [
  {
    type: 'item',
    item: {
      id: "lineup-facial-scanner",
      title: "RAYFace",
      desc: "わずか0.5秒のワンショット撮影で高精度な3D顔貌データを構築。6眼CMOSカメラが自然な笑顔や表情の奥行きを逃さず記録し、CTや口腔内スキャンと完全統合します。",
      videoUrl: "/videos/rayface_promo.mp4",
      image: rayfaceDeviceStudioImg,
      badge: "0.5秒ワンショット 高精度顔貌スキャナー",
      features: [
        "0.5秒の超高速ワンショット撮影で患者の体動ブレを完全に抑制",
        "6基の高解像度カメラによる立体深度データとリアルテクスチャの同時取得",
        "CTデータおよび口腔内スキャン（IOS）とのAI自動マッチング",
        "オープンフォーマット（OBJ / PLY / STL）出力によるexocad・各種CAD連携"
      ],
      specs: [
        { label: "スキャン時間", value: "0.5 秒 (ワンショット)" },
        { label: "カメラ構成", value: "3D CMOSカメラ 6台" },
        { label: "出力形式", value: "OBJ / PLY / STL (オープン)" }
      ],
      interactiveType: "rayface-oneshot"
    }
  },
  {
    type: 'group',
    group: {
      id: "cbct",
      title: "CBCT",
      items: [
        {
          id: "cbct-alpha-edge",
          title: "RAYSCAN α3DEdge",
          desc: "次世代エッジセンサーテクノロジーを搭載し、極小ボクセルサイズと超低線量撮影を高度に両立させたプレミアム歯科用CTシステム。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayscanImg,
          badge: "超高精細Edgeセンサー搭載",
          groupId: "cbct",
          groupTitle: "CBCT",
          features: [
            "超高精細ボクセルサイズによる微細根管・骨梁構造の鮮明描画",
            "金属アーチファクト抑制（MAR）アルゴリズムの進化版搭載",
            "ワイドFOV対応で全顎・上気道・顎関節を一度の撮影でカバー",
            "高速照射プロトコルによる体動ボケの大幅軽減"
          ],
          specs: [
            { label: "最小ボクセル", value: "70 μm 超微細" },
            { label: "撮影モード", value: "CT / パノラマ / セファロ" },
            { label: "照射時間", value: "最速 4.9 秒" }
          ],
          interactiveType: "lineup-studio"
        },
        {
          id: "cbct-quantum",
          title: "RAY Quantum",
          desc: "革新的なフォトンカウンティング・クアンタム技術を採用したRAYの最高峰フラッグシップCT。圧倒的な低ノイズと診断解像度を誇ります。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: lineupPremiereImg,
          badge: "次世代クアンタムテクノロジー",
          groupId: "cbct",
          groupTitle: "CBCT",
          features: [
            "次世代量子センサーによる極限の低ノイズ・高コントラスト画像",
            "超低被曝でありながら微小クラックや微細病変を逃さず描写",
            "ダイナミックレンジの飛躍的向上による軟組織・硬組織の明瞭分離",
            "AIノイズリダクションエンジン常時稼働"
          ],
          specs: [
            { label: "センサー方式", value: "次世代クアンタムセンサー" },
            { label: "被曝線量", value: "従来機比 最大約50%低減" },
            { label: "診断領域", value: "歯内療法・微小骨欠損・インプラント" }
          ],
          interactiveType: "lineup-quantum"
        },
        {
          id: "cbct-alpha-plus",
          title: "RAYSCAN α＋",
          desc: "確かな診断力と洗練されたエルゴノミクスデザインを兼ね備え、国内外で高い信頼と導入実績を誇るスタンダード歯科用CTシステム。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayscanImg,
          badge: "確かな診断力 スタンダードCT",
          groupId: "cbct",
          groupTitle: "CBCT",
          features: [
            "可変式FOVにより局所1歯から全顎まで必要な領域だけ最適撮影",
            "直感的なLEDタッチポジショニングアシスト",
            "高感度CMOSセンサーによるクリアで安定した断層画像",
            "省スペース設計で標準的なレントゲン室にスムーズ設置可能"
          ],
          specs: [
            { label: "FOVバリエーション", value: "4×3 / 9×9 / 10×10 / 12×10 cm" },
            { label: "照射時間", value: "4.9 秒 (超高速モード)" },
            { label: "設置面積", value: "幅1,130 × 奥行1,320 mm" }
          ],
          interactiveType: "lineup-alpha"
        },
        {
          id: "cbct-premiere",
          title: "RAY PreMiere",
          desc: "大型FOVと洗練されたプレミアムデザイン。CT・パノラマ・セファロに加え、顔貌データ統合までを見据えたハイエンドモデル。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: lineupPremiereImg,
          badge: "ハイエンド・プレミアムCT",
          groupId: "cbct",
          groupTitle: "CBCT",
          features: [
            "大型FOV（最大16×10cm）で顎顔面領域全体をワンショット網羅",
            "グッドデザイン賞等を受賞した洗練された外観美",
            "オープンタイプの患者ポジショニングで車椅子患者にも完全対応",
            "RAYFaceとの高精度座標連動プロトコル標準搭載"
          ],
          specs: [
            { label: "最大FOV", value: "16 × 10 cm (大型フリーFOV)" },
            { label: "機能統合", value: "CT / パノラマ / セファロ / 顔貌連動" },
            { label: "デザイン", value: "エルゴノミクス受賞デザイン" }
          ],
          interactiveType: "lineup-premiere"
        },
        {
          id: "cbct-s",
          title: "RAYSCAN S",
          desc: "スマートクリニックのために設計された超コンパクト設計の歯科用CT。小スペースでも妥協のない高画質診断を提供します。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: rayscanImg,
          badge: "超コンパクト・スマート設計",
          groupId: "cbct",
          groupTitle: "CBCT",
          features: [
            "限られたレントゲン室にも無理なく収まる最小フットプリント",
            "シンプルな操作フローでスタッフ誰でも迷わず撮影可能",
            "日々の一般診療・歯内・歯周病診断に十分な基本画質を確保",
            "高いコストパフォーマンスと優れた耐久性"
          ],
          specs: [
            { label: "フットプリント", value: "業界最小クラス省スペース" },
            { label: "基本撮影", value: "CT / パノラマ" },
            { label: "導入推奨", value: "新規開業・省スペースクリニック" }
          ],
          interactiveType: "lineup-s"
        }
      ]
    }
  },
  {
    type: 'group',
    group: {
      id: "ios",
      title: "IOS",
      items: [
        {
          id: "ios-rayios",
          title: "RAYiOS",
          desc: "超軽量・高速フルアーチスキャンを実現するRAY純正の口腔内スキャナー。人間工学に基づいたペングリップで操作性に優れます。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: raymillImg,
          badge: "超軽量・高速フルアーチスキャン",
          groupId: "ios",
          groupTitle: "IOS",
          features: [
            "軽量スリムボディ（約180g）による疲労感のない快適スキャニング",
            "パウダーフリー・リアルカラーテクスチャ高精細スキャン",
            "AIインテリジェント咬合マッチングと余剰粘膜の自動除去",
            "オートクレーブ対応スキャンチップ（複数サイズ展開）"
          ],
          specs: [
            { label: "重量", value: "約180g (超軽量設計)" },
            { label: "スキャン速度", value: "全顎約45秒" },
            { label: "接続方式", value: "USB-C Direct Plug & Play" }
          ],
          interactiveType: "lineup-ios"
        },
        {
          id: "ios-medit",
          title: "Medit Series",
          desc: "世界的人気を誇るMedit口腔内スキャナー（i700 / i900）シリーズ。RAYソリューションとの完全シームレスなクラウド連携に対応。",
          videoUrl: "/videos/ray_5d_concept.mp4",
          image: raymillImg,
          badge: "Medit i700 / i900 完全対応",
          groupId: "ios",
          groupTitle: "IOS",
          features: [
            "Medit Linkクラウドを通じたダイレクトなデータインポート",
            "高精度フルアーチスキャンと精緻なマージンライン描画",
            "RAYFaceおよびRAY Millとのワンクリックデータ受け渡し",
            "幅広い症例（補綴・インプラント・矯正）に対応する充実のアプリ群"
          ],
          specs: [
            { label: "対応機種", value: "Medit i700 / i700 wireless / i900" },
            { label: "クラウド連携", value: "Medit Link ↔ RAYクラウド" },
            { label: "フォーマット", value: "オープンSTL / PLY" }
          ],
          interactiveType: "lineup-medit"
        }
      ]
    }
  },
  {
    type: 'item',
    item: {
      id: "lineup-milling-machine",
      title: "RAY Mill C",
      desc: "高剛性スピンドルを搭載したチェアサイドCAD/CAMミリングマシン。ジルコニア、ガラスセラミック、ハイブリッドレジンを高精度かつ高速切削し、院内即日修復（1Day トリートメント）を実現します。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "高剛性・高速チェアサイドミリング",
      features: [
        "高剛性スピンドルによるジルコニア・セラミックの精密高速加工（単冠約12分）",
        "湿式（Wet）・乾式（Dry）両用対応で多彩なマテリアルに対応",
        "RAYFaceおよび口腔内スキャナー（IOS）とのシームレスなデジタル連携",
        "オープンNCコード対応で各種CAD/CAMソフトウェアと自在に連携可能"
      ],
      specs: [
        { label: "加工方式", value: "5軸 / 4軸 高剛性ミリング" },
        { label: "加工時間", value: "単冠 約12分" },
        { label: "対応素材", value: "ジルコニア / ガラスセラミック / PMMA / ハイブリッド" }
      ],
      interactiveType: "cadcam-oneday"
    }
  },
  {
    type: 'item',
    item: {
      id: "3d-printer",
      title: "RAYDent Studio",
      desc: "高精度光造形（DLP/LCD）技術により、サージカルガイド、精密作業模型、マウスピースをチェアサイドで短時間造形するデンタル3Dプリンター。",
      videoUrl: "/videos/ray_5d_concept.mp4",
      image: raymillImg,
      badge: "高速・精密 デンタル光造形",
      features: [
        "サージカルガイドをわずか約30分で高精度造形",
        "生体適合性レジン（サージカルガイド・スプリント等）各種対応",
        "自動プラットフォームキャリブレーションによる造形失敗ゼロ化",
        "院内ワンストップでのデジタルデンティストリー完結をサポート"
      ],
      specs: [
        { label: "造形方式", value: "高精細 光造形 (DLP / LCD)" },
        { label: "積層ピッチ", value: "25μm / 50μm / 100μm" },
        { label: "対応素材", value: "サージカルガイド / モデル / マウスピース" }
      ],
      interactiveType: "lineup-3dprinter"
    }
  }
];

export const appData: Record<string, SolutionCategory> = {
  "5d": {
    id: "5d",
    title: "RAY 5D Concept",
    subText: "",
    leadDesc: "CTデータ・口腔内スキャン・顔貌データを1つの画面に統合。インプラント、矯正、小児、歯内療法まで全科に対応する次世代デンタル画像診断統合システム。",
    heroImage: software5dGdriveImg,
    gdriveId: "18Xr4v6msSpAk4l0F9rLLRSZ6yyaG1z4j",
    entries: fiveDEntries,
    items: flattenEntries(fiveDEntries)
  },
  "rayface": {
    id: "rayface",
    title: "RAYFace",
    subText: "",
    leadDesc: "ワンショット0.5秒の3Dフェイススキャン。顔貌・骨格・歯列を融合した「バーチャルペイシェント」が患者との信頼関係と自費治療成約率を飛躍的に向上させます。",
    heroImage: rayfaceGdriveImg,
    gdriveId: "1BTPSNUxhJdQs6qhlGc7_zaZ9DRo9TqU8",
    entries: rayfaceEntries,
    items: flattenEntries(rayfaceEntries)
  },
  "cadcam": {
    id: "cadcam",
    title: "CAD/CAM Solution",
    subText: "",
    leadDesc: "口腔内スキャンから即日ミリングまで。外注依存を脱却し、高品質な補綴物を院内ワンストップで完結するデジタル治療の最高峰。",
    heroImage: cadcamGdriveImg,
    gdriveId: "1BSALdG1DmP1H73FwCYLd_oVcs-pqV0uV",
    imagePosition: "object-top origin-top",
    entries: cadcamEntries,
    items: flattenEntries(cadcamEntries)
  },
  "lineup": {
    id: "lineup",
    title: "Total Lineup",
    subText: "",
    leadDesc: "フラッグシップCBCTからチェアサイドミリングマシンまで。クリニックのスケールと専門性に合わせた妥協なき製品群。",
    heroImage: lineupPremiereImg,
    gdriveId: "1px59-QP6WWj4XiYirNVyLj7iShyu0H6P",
    imagePosition: "object-center",
    entries: lineupEntries,
    items: flattenEntries(lineupEntries)
  }
};
