import React from 'react'
import { Input } from 'semantic-ui-react'

const Search = (props) => (

  <div>
  	<Input icon='users' size='mini' iconPosition='left' onChange={props.searchHandle} placeholder='Поиск контакта ...' />
  </div>

)

export default Search