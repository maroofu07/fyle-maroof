$(document).ready(function () {
     fetchRepositories(currentPage);
     $('#searchInput').on('input', function () {
         currentPage = 1;
         fetchRepositories(currentPage);
     });
     $('#prevBtn').on('click', function () {
         if (currentPage > 1) {
             currentPage--;
             fetchRepositories(currentPage);
         }
     });
     $('#nextBtn').on('click', function () {
         currentPage++;
         fetchRepositories(currentPage);
     });
 });
 
 function fetchRepositories(page) {
     const searchQuery = $('#searchInput').val();
     const apiUrl = `https://api.github.com/users/${githubUsername}/repos?per_page=${perPage}&page=${page}&q=${searchQuery}`;
 
     $('#repoList').html('<li>Loading...</li>');
 
     $.ajax({
         url: apiUrl,
         type: 'GET',
         dataType: 'json',
         success: function (data) {
             displayRepositories(data);
             updatePagination(page, Math.ceil(data.length / perPage));
         },
         error: function (xhr, status, error) {
             $('#repoList').html(`<li>Error fetching data: ${error}</li>`);
         }
     });
 }
 