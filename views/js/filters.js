const Filter = require('../../lib/models/Filter')

const deleteFilter = document.getElementById('delete-filter')


deleteFilter.addEventListener('click', (filterId, userId) => {
  await Filter.remove(filterId, userId);
})
