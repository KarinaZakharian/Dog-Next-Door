:
RECEPTIONNE, 01 MESSAGE, 0N USER
ANIMAL : code_animal, type, photo, name, weight, age, sex, breed, about, energy_level, feeding schedule, potty_break_schedule
TESTIMONIAL : code_testimonial, body, rating
DISPONIBILITY : code_disponibility, start_date, end_date
:

:
MESSAGE : code_message, topic, body
POSSEDE, 11 ANIMAL, 0N USER
DONNE, 11 TESTIMONIAL, 0N USER
ETABLIR, 0N DISPONIBILITY, 1N USER
PERMISSION : code_permission, label

:
ECRIRE, 0N USER, 11 MESSAGE
USER : code_user, firstname, lastname, email, avatar, street_number, street_name, zip_code, town, country
DETIENT, 1N USER, 0N ROLE
ROLE : code_role, label
APPARTIENT, 0N PERMISSION, 1N ROLE

:
ATTRIBUER, 01 BOOKING, 0N USER
AFFICHE, 11 IMAGE, 0N USER
ENVOIE, 01 MESSAGE_ADMIN, 0N USER
:
:

BOOKING : code_booking, start_date, end_date, status
RESERVER, 11 BOOKING, 0N USER
IMAGE : code_image, label, path_access
MESSAGE_ADMIN : code_message_admin, subject, message
:
: