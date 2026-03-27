'use client'

import { useState, useEffect } from 'react'
import { Equipment } from '@/types'
import { sampleCategories, sampleBrands } from '@/lib/data/sample-equipment'

interface EquipmentFormProps {
  equipment: Equipment | null
  onSuccess: () => void
  onCancel: () => void
}

export default function EquipmentForm({ equipment, onSuccess, onCancel }: EquipmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    title: string;
    brand: string;
    model: string;
    categoryId: string;
    price: string;
    priceUnit: string;
    condition: 'new' | 'refurbished' | 'demo';
    status: 'available' | 'sold' | 'reserved';
    year: number;
    warranty: string;
    stock: number;
    description: string;
    specifications: Record<string, any>;
    features: string[];
    thumbnail: string;
    images: string[];
    isPublished: boolean;
    metaTitle: string;
    metaDescription: string;
  }>({
    title: '',
    brand: '',
    model: '',
    categoryId: '',
    price: '',
    priceUnit: 'KRW',
    condition: 'new',
    status: 'available',
    year: new Date().getFullYear(),
    warranty: '',
    stock: 1,
    description: '',
    specifications: {},
    features: [],
    thumbnail: '/images/equipment/placeholder.jpg',
    images: [],
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
  })

  // 사양 및 특징 입력용 임시 상태
  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (equipment) {
      setFormData({
        title: equipment.title,
        brand: equipment.brand,
        model: equipment.model,
        categoryId: equipment.categoryId,
        price: String(equipment.price),
        priceUnit: equipment.priceUnit,
        condition: equipment.condition,
        status: equipment.status,
        year: equipment.year,
        warranty: equipment.warranty || '',
        stock: equipment.stock,
        description: equipment.description,
        specifications: equipment.specifications || {},
        features: equipment.features,
        thumbnail: equipment.thumbnail,
        images: equipment.images,
        isPublished: equipment.isPublished,
        metaTitle: equipment.metaTitle || '',
        metaDescription: equipment.metaDescription || '',
      })
    }
  }, [equipment])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // 사양 추가
  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: specValue }
      }))
      setSpecKey('')
      setSpecValue('')
    }
  }

  // 사양 삭제
  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  // 특징 추가
  const addFeature = () => {
    if (featureInput) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput]
      }))
      setFeatureInput('')
    }
  }

  // 특징 삭제
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 카테고리 정보 추가
      const category = sampleCategories.find(cat => cat.id === formData.categoryId)
      
      const submitData = {
        ...formData,
        category: category ? { name: category.name, slug: category.slug } : undefined,
      }

      const url = equipment 
        ? `/api/admin/equipment/${equipment.id}`
        : '/api/admin/equipment'
      
      const method = equipment ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message || '저장되었습니다.')
        onSuccess()
      } else {
        alert(data.error || '저장에 실패했습니다.')
      }
    } catch (error) {
      console.error('폼 제출 오류:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            장비명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="예: Agilent 1260 Infinity II HPLC"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제조사 <span className="text-red-500">*</span>
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">선택하세요</option>
            {sampleBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            모델명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="예: 1260 Infinity II"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">선택하세요</option>
            {sampleCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            가격 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="숫자 또는 '별도협의', '문의'"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상태 <span className="text-red-500">*</span>
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="new">신품</option>
            <option value="refurbished">리퍼</option>
            <option value="demo">데모</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            판매 상태
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="available">판매중</option>
            <option value="reserved">예약중</option>
            <option value="sold">판매완료</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제조년도
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="2000"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            보증기간
          </label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="예: 2년, 1년"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            재고 수량
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* 설명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          장비 설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="장비에 대한 상세 설명을 입력하세요"
        />
      </div>

      {/* 사양 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사양
        </label>
        <div className="space-y-2">
          {Object.entries(formData.specifications).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <span className="font-medium">{key}:</span>
              <span className="flex-1">{value}</span>
              <button
                type="button"
                onClick={() => removeSpecification(key)}
                className="text-red-600 hover:text-red-800"
              >
                삭제
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
              placeholder="항목명"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              placeholder="값"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              추가
            </button>
          </div>
        </div>
      </div>

      {/* 특징 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          주요 특징
        </label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <span className="flex-1">{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-600 hover:text-red-800"
              >
                삭제
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="특징 입력"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              추가
            </button>
          </div>
        </div>
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
          즉시 공개
        </label>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              저장 중...
            </>
          ) : (
            equipment ? '수정하기' : '추가하기'
          )}
        </button>
      </div>
    </form>
  )
}
