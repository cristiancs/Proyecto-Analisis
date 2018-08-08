
def agregar_id():
	csv = open("tollevar.csv")
	csv_procesado = open("tollevar-procesado.csv", "w")
	i = 1
	for lin in csv:
		lin = str(i)+","+lin
		csv_procesado.write(lin)
		i+=1
	csv.close()
	csv_procesado.close()

def to_db():

	import sqlite3
	import csv

	con = sqlite3.connect("multiwireless.sqlite.db") ## these statements belong outside the loop
	cursor = con.cursor()  ## execute them just once

	with open ('tollevar-procesado.csv', 'r') as f:
	    reader = csv.reader(f)
	    columns = next(reader)
	    columns = [h.strip() for h in columns]
	    
	    #~ for row in reader:    ## we will read the rows later in the loop
	        #~ print(row)

	    query = 'insert into logs values ({0})'
	    query = query.format(','.join(columns), ','.join('?' * len(columns)))
	    print(query)
	    cursor = con.cursor()
	    for row in reader:
	        cursor.execute(query, row)
	    con.commit()
	    con.close()
to_db()