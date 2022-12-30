const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculation();

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected'); //selected içeriyorsa siler içermiyorsa ekler.
        calculation();
    }

});

select.addEventListener('change',function(e){
    calculation();
});
function calculation(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatsIndex = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*select.value;
    saveToLocalStorage(selectedSeatsIndex);

}

function getFromLocalStorage(){
    const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex= JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if(selectedMovieIndex != null){
        select.selectedMovieIndex;
    }
}

function saveToLocalStorage(index){
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);

}