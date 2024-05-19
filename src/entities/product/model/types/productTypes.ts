export interface IProduct {
  id: number;
  attributes: {
    title: string;
    price: number;
    description: string;
    sizes: [];
    colors: [];
    pictures: {
      data: [
        {
          id: number;
          attributes: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            formats?: string;
            url: string;
          };
        }
      ];
    };
    mainPicture: {
      data: {
        id: number;
        attributes: {
          name?: string;
          alternativeText?: string;
          caption?: string;
          formats?: string;
          url: string;
        };
      };
    };
    category: string;
    discountPercent: number;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
          password?: string;
          provider?: string;
          confirmed?: boolean;
          blocked?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
      };
    };
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    createdBy?: {
      data: {
        id: number;
        attributes: {};
      };
    };
    updatedBy?: {
      data: {
        id: number;
        attributes: {};
      };
    };
    quantity?: number;
  };
}

export interface IProductIdResponse {
  data: IProduct;
}

export interface IProductsResponse {
  data: IProduct[];
}

export interface IUpdateProductIdRequest {
  id: number;
  data: {
    title?: string;
    price?: number;
    description?: string;
    sizes?: [];
    colors?: [];
    pictures?: {};
    mainPicture?: {};
    category?: string;
    discountPercent?: number;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
        };
      };
    };
  };
}

export interface ICategory {
  id: number;
  attributes: {
    title: string;
    icon: {
      data: [
        {
          id: number;
          attributes: {
            name: string;
            url: string;
          };
        }
      ];
    };
  };
}

export interface IGetCategories {
  data: ICategory[];
}
