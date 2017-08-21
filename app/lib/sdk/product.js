'use strict'

const db = require('../db/connectionFactory').kickCommerce

const category = module.exports = {}

category.fetch = async (options) => {
  if (!options.siteId) return []

  if (!options.fields) {
    options.fields = ['id', 'name', 'heading', 'code', 'url', 'metaTitle', 'metaKeywords', 'metaDescription', 'description', 'description2', 'description3', 'featured', 'mainNav']
  }
  const fields = options.fields.map(field => `category.${category._fieldMapping[field]}`).join()

  const params = []

  let sql = `
    SELECT
      ${fields},
      parent.category_id as parent_category_id
    FROM category
    LEFT JOIN category parent ON parent.category_code = LEFT(category.category_code, LENGTH(category.category_code) -5) AND parent.category_site_id = category.category_site_id
    WHERE category.category_site_id = ?
    AND ( parent.category_id IS NOT NULL OR LENGTH(category.category_code) = 5) `

  params.push(options.siteId)

  if (options.categoryId) {
    sql += `AND category.category_id = ?`
    params.push(options.categoryId)
  }

  sql += `ORDER BY LENGTH(category.category_code), category.category_order, category.category_id`

  const response = await db.query(sql, params)
  if (!response || response.length === 0) return []
  return response.map(category._transform)
}

category._fieldMapping = {
  id: 'category_id',
  name: 'category_name',
  heading: 'category_heading',
  code: 'category_code',
  url: 'category_rewriteurl_page_name',
  metaTitle: 'category_meta_title',
  metaKeywords: 'category_meta_keywords',
  metaDescription: 'category_meta_description',
  description: 'category_description',
  description2: 'category_description_2',
  description3: 'category_description_3',
  featured: 'category_featured',
  mainNav: 'category_main_nav'
}

category._transform = (row) => ({
  id: row.category_id,
  name: row.category_name,
  heading: row.category_heading,
  code: row.category_code,
  url: row.category_rewriteurl_page_name,
  metaTitle: row.category_meta_title,
  metaKeywords: row.category_meta_keywords,
  metaDescription: row.category_meta_description,
  description: row.category_description,
  description2: row.category_description_2,
  description3: row.category_description_3,
  featured: row.category_featured === 1,
  mainNav: row.category_main_nav === 1,
  parentId: row.parent_category_id
})
