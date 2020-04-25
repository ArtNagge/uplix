import formatFN from '../utils/formatFN'
import randomInteger from '../utils/random'

describe('Проверка имени для меню:', () => {
  test('Возвращает корректно обрезанные ФИ', () => {
    expect(formatFN('Ян Гринберг')).toEqual('Ян Гринберг')
    expect(formatFN('Владислав Гладкий')).toEqual('Владислав Г.')
    expect(formatFN('Alexander Herzog')).toEqual('Alexander H.')
  })

  test('Возвращает строку', () => {
    expect(formatFN('Ян Гринберг')).toBeDefined()
    expect(formatFN('Владислав Гладкий')).toBeDefined()
    expect(formatFN('Alexander Herzog')).toBeDefined()

    expect(formatFN('Ян Гринберг')).not.toBeFalsy()
    expect(formatFN('Владислав Гладкий')).not.toBeFalsy()
    expect(formatFN('Alexander Herzog')).not.toBeFalsy()

    expect(typeof formatFN('Ян Гринберг')).toBe('string')
    expect(typeof formatFN('Владислав Гладкий')).toBe('string')
    expect(typeof formatFN('Alexander Herzog')).toBe('string')
  })
})

describe('Проверка random функции:', () => {
  test('Возвращает значение не больше максимального предела:', () => {
    expect(randomInteger(0, 25)).not.toBeGreaterThan(25)
    expect(randomInteger(0, 5)).not.toBeGreaterThan(5)
    expect(randomInteger(0, 1)).not.toBeGreaterThan(1)
  })
  test('Возвращает значение не меньше минимального предела:', () => {
    expect(randomInteger(0, 25)).not.toBeLessThan(0)
    expect(randomInteger(0, 5)).not.toBeLessThan(0)
    expect(randomInteger(0, 1)).not.toBeLessThan(0)
  })
  test('Возвращает значение меньше максимального предела:', () => {
    expect(randomInteger(0, 25)).toBeLessThanOrEqual(25)
    expect(randomInteger(0, 5)).toBeLessThanOrEqual(5)
    expect(randomInteger(0, 1)).toBeLessThanOrEqual(1)
  })
})
