const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client');
jest.mock('../product_client.js');

describe('ProductService', () => {
  const fetchItems = jest.fn(async () => [
    { item: 'milk', available: true },
    { item: 'banana', available: false },
  ]);
  ProductClient.mockImplementation(() => {
    return {
      //   fetchItems: fetchItems,
      fetchItems,
    };
  });
  let productService;

  beforeEach(() => {
    productService = new ProductService();
    // fetchItems.mockClear();
    // ProductClient.mockClear();
    // jest.config.js에서 clearMocks: false 인 겨우 위의 두 개의 함수로
    // 설정한 mock을 clear 시켜주어야 함
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(fetchItems).toHaveBeenCalledTimes(1);
    expect(items).toEqual([{ item: 'milk', available: true }]);
  });
});

// product_service에서
// fetchAvailableItems함수를 동작시 받아오는 값을 테스트하는 코드인데
// 함수를 동작하면  다른 모듈의 객체와 그 함수를 사용하게 됨으로
// 유닛테스트를 위한 독립성이 없어지게 됩니다.

// 이를 해결하기 위해
// jest.mock("../product_client.js");을 사용하여
// 테스트 코드내에서는
// product_client.js에서 불러온 값이 가짜 객체로 처리됩니다.

// 또한 product_client에서 데이터를 받아오는
// fetchItems()함수를 대체하기 위해 jest.fn()으로 함수가  실행되고
// 받아올 데이터를 지정해줍니다

// 이제 ProductClient클래스에 fetchItems()을
// mockImplementation를 이용하여 테스트코드에서 만들어 둔
// fetchItems로 교체 시켜줍니다
// 이렇게 의존성을 해치는 값들을 mock처리해서 독립성을 보장합니다
