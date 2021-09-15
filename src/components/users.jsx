import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './userTable'
import { paginate } from '../utils/paginate'
import api from '../api/index'
import _ from 'lodash'

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  // Первый способ сбросить фильтр, добавить еще одну строку в список
  // НО ЭТО НЕ СРАБОТАЕТ ДЛЯ МАССИВОВ
  // Проще и лучше добавить Button с обработчиком
  // useEffect(() => {
  //   api.professions
  //     .fetchAll()
  //     .then((data) =>
  //       setProfession(
  //         Object.assign(data, { allProfession: { name: 'Все профессии' } })
  //       )
  //     )
  // }, [])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    // принимаем объект
    setSortBy(item)
  }

  // Смотрим есть ли фильтр у юзеров, если есть фильтруем массив,
  // нет возвращаем нефильтрованный массив

  // Для первого метода Проверяем если есть выбранный фильтр и у него есть id->отображаем, если нет id - значет это 'Все пользователи'
  // const filteredUsers =
  //   selectedProf && selectedProf._id
  //     ? allUsers.filter((user) => user.profession === selectedProf)
  //     : allUsers

  const filteredUsers = selectedProf
    ? allUsers.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : allUsers
  const count = filteredUsers.length

  // для фильтрации используем lodash
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])

  // Разбиваем основной массив c users на части
  // в соответствии с количеством user-ов на одной странице
  const users = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <UserTable
            users={users}
            onSort={handleSort}
            currentSort={sortBy}
            {...rest}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}
export default Users
