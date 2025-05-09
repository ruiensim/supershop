import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({title,description,keywords}) => {

  return (
 <Helmet>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta name="keywords" content={keywords}/>
 </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to Holzern Furniture Sdn Bhd Malaysia",
    description: "We provide high quality and enviroment friendly furniture",
    keywords: "furnitre, malaysia, is"
}

export default Meta
