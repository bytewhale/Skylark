export { };

declare global {
  interface IUserInfo {
    uid: number,
    phone: number,
    userName: string,
    avatar: string
  }
  interface ISelectOption {
    text: string,
    value: string | number
  }

  enum CaseType {
    Litigation = 1,
    NonLitigation,
  }
  enum LevelOfCourt {
    FirstTrial = 1,
    SecondTrial,
    Retrial
  }

  // 合同/文件审查
  // 法律咨询
  // 现场服务
  // 法律培训
  // 草拟文件
  enum ServiceCategory {
    DocumentReview = 1,
    LegalAdvice,
    OnSiteService,
    LegalTraining,
    DraftingDocuments
  }
}
