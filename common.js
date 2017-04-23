 (function() {
	"use strict"
	var takeData = {
		val : function() {
			var info = document.getElementById("info");
			var select = info.querySelectorAll("input");
			var sub = document.getElementById("sub");
			var norm = document.getElementById("norm");
			var boldSum = info.querySelector("b");

			sub.addEventListener("click", validate);


			//Универсальная функция проверки
			function validate() {

				//Создаем массив для ошибок
				var error = [];
				//Записываем 1, если поле пустое или не является числом
				function ifNull(field, count) {
					//проверяем число на пустое значение
					if(count === 1) {
						if(field === "") {
							error.push(1);
						}
					}
					//проверяем на число или пустое значение
					else if(field === "" || field != field.match(/\d+/)) {
						error.push(1);
					}
					return false;
				}
				//Проходим по всем полям
				var count = 0;
				for (var i = 0; i < select.length - 1; i++) {
					var field = select[i].value;
					count++;
					select[i] = ifNull(field, count);
				}
				//Если массив не пустой значит есть ошибка
				if(error != 0) {
					alert ("Необходимо заполнить поля числовыми значениями!");
					var error = [];
				} else {
					getData();
					sendDataServer();
				}
				
			}

			//Запись данных пользователя в соседнюю колонку
			function getData() {
				var prjDate = document.getElementById("show");
				var span = prjDate.querySelectorAll("span");
				var count = 0;
				var i = 0;
				for(i = 0; i < span.length; i++) {
					span[i].innerText = select[count].value;
					count++;
				}
				var sum = prjDate.querySelector("b");
				var result = 0;
				for(i = 1; i < span.length; i++){
					result += parseInt(select[i].value);
				}
				sum.innerText = result;
			};

			//Отправляем полученные данные на сервер
			function sendDataServer() {
				var params = 'date=' + select[0].value + 
				'&food=' + select[1].value + 
				'&things=' + select[2].value + 
				'&transport=' + select[3].value +
				'&fun=' + select[4].value + '&sum=' + boldSum.innerText;
				safeData(params);
			}
			
			function safeData(params) {
				var xhr = new XMLHttpRequest();

				xhr.onreadystatechange = function() {
					if(xhr.readyState === 4 && xhr.status == 200 || xhr.status == 304) {
						norm.innerHTML = xhr.responseText;
					};
				};

				xhr.open("POST", "validate-data.php");
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(params);
			}

		},
		spendMoney : function() {
			var money = document.getElementById("money");
			var costs = document.getElementById("costs");
			var safeMoney = document.getElementById("safe-money");

			costs.addEventListener("click", datePay);

			function datePay() {
				var chooseDate = money.querySelector("input");
				if(chooseDate.value !== "") {
					var params = 'date=' + chooseDate.value;
					dataMoney(params);
				}else {
					alert("Выберите дату!");
				}
			};
			function dataMoney(params) {
				var xhr = new XMLHttpRequest();

				xhr.onreadystatechange = function() {
					if(xhr.readyState === 4 && xhr.status == 200 || xhr.status == 304) {
						safeMoney.innerHTML = xhr.responseText;
					};
				}

				xhr.open("POST", "costs.php");
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(params);
			}
		 }
	};
	takeData.val();
	takeData.spendMoney();
})();