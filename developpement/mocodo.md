:
BOOKING : code_booking, start_date, end_date, status
ANIMAL : code_animal, type, photo, name, weight, age, sex, breed, about, energy_level, feeding schedule, potty_break_schedule
:
:

:
RESERVER, 11 BOOKING, 0N USER
POSSEDE, 11 ANIMAL, 0N USER
AFFICHE, 11 IMAGE, 0N USER
IMAGE : code_image, label, path_access

DISPONIBILITY : code_disponibility, Start_date, end_date
ETABLIR, 0N DISPONIBILITY, 1N USER
USER : code_user, firstname, lastname, email, avatar, street_number, street_name, zip_code, town, country
DONNE, 11 TESTIMONIAL, 0N USER
:

:
DETIENT, 1N USER, 0N ROLE
ECRIRE, 0N USER, 11 MESSAGE
TESTIMONIAL : code_testimonial, body, rating
:

:
ROLE : code_role, label
MESSAGE : code_message, topic, body
:
:

:
APPARTIENT, 0N PERMISSION, 1N ROLE
:
:
:

:
PERMISSION : code_permission, label
:
:
: